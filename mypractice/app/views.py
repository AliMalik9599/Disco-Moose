import datetime

from .models import Card, Course, Skill, CardProgress, Deck
from .serializer import CardSerializer, CourseSerializer, SkillSerializer
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


class CourseList(generics.ListCreateAPIView):
	serializer_class = CourseSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		return Course.objects.all()


class SkillList(generics.ListCreateAPIView):
	serializer_class = SkillSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		courseid = self.kwargs.get('courseid')
		return Skill.objects.filter(course=courseid)


class CardList(generics.ListCreateAPIView):
	serializer_class = CardSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		userid = self.request.user.id
		user = User.objects.get(id=userid)
		courseid = self.kwargs.get('courseid')
		course = Course.objects.get(id=courseid)
		skills = self.kwargs.get('skills')
		skill_list = skills.split(',')
		time = int(self.kwargs.get('time'))
		num_cards = int(time / 5)

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

		skill1 = skill_list[0]
		skill_obj1 = Skill.objects.get(id=skill1)
		card_queryset = Card.objects.filter(course=course, skill=skill_obj1)

		for skill in skill_list:
			skill_obj = Skill.objects.get(id=skill)
			subset_cards = Card.objects.filter(course=course, skill=skill_obj)
			card_queryset = card_queryset | subset_cards

		card_list = []

		for card in card_queryset:
			card_progress, created = CardProgress.objects.get_or_create(card=card, user=user)
			card_dict = model_to_dict(card)
			card_dict["is_complete"] = card_progress.is_completed
			card_dict["is_favorited"] = card_progress.is_favorited
			card_dict["last_completed"] = card_progress.last_completed
			card_list.append(card_dict)
			print(card_dict)

		card_list = list(card_list)
		today = datetime.date.today()

		# Sorts cards by last_completed.
		# If last_completed is None (has never been complted) it is given a temp date
		# (today - 300 days) so that it can be compared to other dates but still come
		# first in sorted order
		card_list.sort(
			key=lambda x: x["last_completed"] if x["last_completed"] is not None
			else today + datetime.timedelta(days=300), reverse=True
		)

		# Only grab necessary amount of cards.
		time = int(self.kwargs.get('time'))
		num_cards = int(time / 5)
		final_list = card_list[:num_cards]

		card_ids = []
		for card in final_list:
			card_ids.append(card["id"])

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


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_user(request, username):
	print("inside view")
	try:
		person = User.objects.get(username=username)
		return Response(status=status.HTTP_400_BAD_REQUEST)
	except ObjectDoesNotExist:
		data = json.loads(request.body)
		print(data)
		name = data['name']
		username = data['username']
		password = data['password']
		add_user = User.objects.create_user(first_name=name, username=username, password=password)
		add_user.save()
		print(add_user)
		return Response(status=status.HTTP_201_CREATED)





@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def complete_card(request, cardid):
	card = Card.objects.get(id=cardid)
	user = request.user
	card_progress = CardProgress.objects.get(card=card, user=user)
	current_completion_status = card_progress.is_completed
	current_date = card_progress.last_completed

	card_progress.is_completed = not current_completion_status
	card_progress.save()

	if card_progress.is_completed:
		card_progress.last_completed = datetime.date.today()
		card_progress.save()

	if card_progress.is_completed == current_completion_status:
		return Response(status=status.HTTP_404_NOT_FOUND)
	return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def favorite_card(request, cardid):
	card = Card.objects.get(id=cardid)
	user = request.user
	card_progress = CardProgress.objects.get(card=card, user=user)
	current_favorite_status = card_progress.is_favorited
	card_progress.is_favorited = not current_favorite_status
	card_progress.save()
	if card_progress.is_favorited == current_favorite_status:
		return Response(status=status.HTTP_404_NOT_FOUND)
	return Response(status=status.HTTP_204_NO_CONTENT)


def refresh_cardlist(userid, courseid, skills, time):
	user = User.objects.get(id=userid)
	course = Course.objects.get(id=courseid)
	num_cards = int(int(time) / 5)
	deck = Deck.objects.get(user=user, course=course, skills=skills, date=datetime.date.today(), num_cards=num_cards)
	card_ids = deck.cards[1:-1].split(', ')

	card_list = []

	for id in card_ids:
		card = Card.objects.get(id=id)
		card_progress, created = CardProgress.objects.get_or_create(
			card=card,
			user=user
		)
		card_dict = model_to_dict(card)
		card_dict["is_complete"] = card_progress.is_completed
		card_dict["is_favorited"] = card_progress.is_favorited
		card_dict["last_completed"] = card_progress.last_completed
		card_list.append(card_dict)
		print(card_dict)

	card_list = list(card_list)

	return card_list


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
