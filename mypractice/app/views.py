import datetime

from .models import Card, Course, Skill, CardProgress, Deck
from .serializer import CardSerializer, CourseSerializer, SkillSerializer, DeckSerializer
from rest_framework import generics
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.core.exceptions import ObjectDoesNotExist
import json
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache


index = never_cache(TemplateView.as_view(template_name='index.html'))


# Creates a ListView for all Courses in the database
class CourseList(generics.ListCreateAPIView):
	serializer_class = CourseSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		return Course.objects.all()


# Creates a ListView for all Skills in the database that correspond to the Course selected by the user
class SkillList(generics.ListCreateAPIView):
	serializer_class = SkillSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		courseid = self.kwargs.get('courseid')
		return Skill.objects.filter(course=courseid)


# Creates a ListView of Card objects that correspond to the options a user selected: the course they selected, the
# skills they selected, the time they selected. The set of cards returned is the set of cards least-recently viewed by
# the user.
class CardList(generics.ListCreateAPIView):
	serializer_class = CardSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		# Grab current user
		userid = self.request.user.id
		user = User.objects.get(id=userid)
		# Grab selected course
		courseid = self.kwargs.get('courseid')
		course = Course.objects.get(id=courseid)
		# Parse skills string to get the list of skills selected by user
		skills = self.kwargs.get('skills')
		skill_list = skills.split(',')
		skill_objects = Skill.objects.filter(id__in=skill_list)
		# Calculate the number of cards needed via the time input by user
		time = int(self.kwargs.get('time'))
		num_cards = int(time / 5)

		# If a Deck object with these exact attributes exists for the current date, refresh the page using
		# refresh_cardlist() instead
		if Deck.objects.filter(
			user=user,
			course=course,
			skills=skills,
			date=datetime.date.today(),
			num_cards=num_cards
		).exists():
			return refresh_cardlist(
				user.id,
				courseid,
				skills,
				time
			)

		card_queryset = Card.objects.filter(course=course, skill__in=skill_objects)

		# Compress Card and CardProgress objects into one list of dictionaries
		card_list = list(compress_card_cardprogress(user, card_queryset))

		# We now have the correct set of Card objects with CardProgress information appended (as dictionaries)
		today = datetime.date.today()

		# Sorts cards by last_completed.
		# If last_completed is None (has never been completed) it is given a temp date
		# (today - 300 days) so that it can be compared to other dates but still come
		# first in sorted order
		card_list.sort(
			key=lambda x: x["last_completed"] if x["last_completed"] is not None
			else today + datetime.timedelta(days=300), reverse=True
		)

		# Only grab necessary amount of cards.
		final_list = card_list[:num_cards]

		# Translate indexed Card list into a list of integer ids to be saved inside the Deck object
		card_ids = []

		# Reset the "is_complete" attribute if the card was not completed today
		for card in final_list:
			if card["last_completed"] != datetime.date.today():
				card["is_complete"] = False
			card_ids.append(card["id"])

		# Create a Deck object that saves the list of Cards a user is presented with
		deck, created = Deck.objects.get_or_create(
			user=user,
			course=course,
			skills=skills,
			date=datetime.date.today(),
			num_cards=num_cards,
			cards=str(card_ids)
		)
		if created:
			deck.save()
		else:
			return refresh_cardlist(
				self.request.user.id,
				self.kwargs.get('courseid'),
				self.kwargs.get('skills'),
				self.kwargs.get('time')
			)

		return list(final_list)

# Connected to user registration, authenticates user
# credentials and creates the user based on result.
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_user(request, username):

	# Testing if the user with the same username exists
	try:
		User.objects.get(username=username)

		# If person with that username is found -> will not create user
		return Response(status=status.HTTP_400_BAD_REQUEST)

	# If that username is not in the database -> create a new user
	except ObjectDoesNotExist:
		data = json.loads(request.body)
		name = data['name']
		username = data['username']
		password = data['password']
		add_user = User.objects.create_user(first_name=name, username=username, password=password)
		add_user.save()
		return Response(status=status.HTTP_201_CREATED)

# Edits the value stored in "is_completed" for the given Card object's CardProgress object
@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def complete_card(request, cardid):
	card = Card.objects.get(id=cardid)
	user = request.user
	card_progress = CardProgress.objects.get(card=card, user=user)
	current_completion_status = card_progress.is_completed

	card_progress.is_completed = not current_completion_status
	card_progress.save()

	if card_progress.is_completed:
		card_progress.last_completed = datetime.date.today()
		card_progress.save()

	if card_progress.is_completed == current_completion_status:
		return Response(status=status.HTTP_404_NOT_FOUND)
	return Response(status=status.HTTP_204_NO_CONTENT)


# Edits the value that is store in "is_favorited" for
# the given Card's CardProgress object
@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def favorite_card(request, card_id):
	card = Card.objects.get(id=card_id)
	user = request.user

	# Retrieve card progress object based on user and the card id
	card_progress = CardProgress.objects.get(card=card, user=user)
	current_favorite_status = card_progress.is_favorited

	# Toggle the is favorite response and persist this
	card_progress.is_favorited = not current_favorite_status
	card_progress.save()

	# Validation to check that the change has been made
	if card_progress.is_favorited == current_favorite_status:
		return Response(status=status.HTTP_404_NOT_FOUND)
	return Response(status=status.HTTP_204_NO_CONTENT)


# Returns the list of cards saved inside the Deck object that corresponds to the input given: userid, courseid, skills,
# and time plus today's date
def refresh_cardlist(userid, courseid, skills, time):
	# Grab the current user
	user = User.objects.get(id=userid)
	# Grab the Course selected
	course = Course.objects.get(id=courseid)
	# Calculate the number of cards a user is asking for
	num_cards = int(int(time) / 5)
	# Grab the Deck associated with that selection for today's date
	deck = Deck.objects.get(user=user, course=course, skills=skills, date=datetime.date.today(), num_cards=num_cards)
	# Parse the string stored inside Deck
	card_ids = deck.cards[1:-1].split(', ')
	card_queryset = Card.objects.filter(id__in=card_ids)
	# Compress Card and CardProgress objects into one list of dictionaries
	card_list = list(compress_card_cardprogress(user, card_queryset))

	return card_list


# Creates a ListView of Card objects based on the list of cards returned by refresh_cardlist()
class RefreshCardList(generics.ListCreateAPIView):
	serializer_class = CardSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		return refresh_cardlist(
			self.request.user.id,
			self.kwargs.get('courseid'),
			self.kwargs.get('skills'),
			self.kwargs.get('time')
		)


# Function that takes Card and CardProgress objects and compressed them into one dictionary
def compress_card_cardprogress(user, card_queryset):
	# Initialize a list for all of the Card objects to be stored as dictionaries
	card_list = []

	# Each Card object has a CardProgress object for the current user. Grab the information from each Card's
	# CardProgress object and append it to the dictionary for the Card. This disctionary should be stored in
	# card_list
	for card in card_queryset:
		# If a CardProgress object doesn't exist for a user, create it.
		card_progress, created = CardProgress.objects.get_or_create(card=card, user=user)
		# Turn Card object into dictionary
		card_dict = model_to_dict(card)
		# Append values in CardProgress to this dictionary
		card_dict["is_complete"] = card_progress.is_completed
		card_dict["is_favorited"] = card_progress.is_favorited
		card_dict["last_completed"] = card_progress.last_completed
		# Append the Card object's dictionary to card_list
		card_list.append(card_dict)

	return card_list


# Creates a ListView for all Courses in the database
class DeckList(generics.ListCreateAPIView):
	serializer_class = DeckSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		userid = self.request.user.id
		user = User.objects.get(id=userid)
		user_dict = model_to_dict(user)
		decks = Deck.objects.filter(user=user)
		deck_list = []
		for deck in decks:
			card_ids = deck.cards
			skill_ids = deck.skills
			card_id_list = card_ids[1:-1].split(', ')
			skill_id_list = skill_ids.split(',')
			cards = Card.objects.filter(id__in=card_id_list)
			skills = Skill.objects.filter(id__in=skill_id_list)
			card_dict = []
			for card in cards:
				card_dict.append(model_to_dict(card))
			skill_dict = []
			for skill in skills:
				skill_dict.append(model_to_dict(skill))
			deck = model_to_dict(deck)
			course_id = deck["course"]
			course = Course.objects.get(id=course_id)
			course_dict = model_to_dict(course)
			deck["course"] = course_dict
			deck["user"] = user_dict
			deck["cards"] = card_dict
			deck["skills"] = skill_dict
			deck_list.append(deck)
		print(deck_list)
		return list(deck_list)

# Creates a ListView for all Courses in the database
# @api_view(['GET'])
# @authentication_classes([TokenAuthentication,])
# @permission_classes([IsAuthenticated])
# def get_decks(request):
# 	userid = request.user.id
# 	user = User.objects.get(id=userid)
# 	decks = Deck.objects.filter(user=user)
# 	print(decks)
# 	deck_list = []
# 	for deck in decks:
# 		card_ids = deck.cards
# 		print(card_ids)
# 		card_id_list = card_ids[1:-1].split(', ')
# 		print(card_id_list)
# 		cards = Card.objects.filter(id__in=card_id_list)
# 		card_dict = []
# 		for card in cards:
# 			card_dict.append(model_to_dict(card))
# 		print(card_dict)
# 		deck = model_to_dict(deck)
# 		print(deck)
# 		deck["cards"] = card_dict
# 		print(deck)
# 		deck_list.append(deck)
# 	print(deck_list)
# 	return deck_list

