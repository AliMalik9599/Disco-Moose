from .models import Card, Course, Skill, CardProgress
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
			print(card_dict)
			card_list.append(card_dict)

		return list(card_list)


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
	if card_progress.is_completed == current_completion_status:
		return Response(status=status.HTTP_404_NOT_FOUND)
	return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@authentication_classes([TokenAuthentication,])
@permission_classes([IsAuthenticated])
def favorite_card(request, cardid):
	#print("IN FAVORITE FUNCTION")
	card = Card.objects.get(id=cardid)
	user = request.user
	card_progress = CardProgress.objects.get(card=card, user=user)
	current_favorite_status = card_progress.is_favorited
	card_progress.is_favorited = not current_favorite_status
	card_progress.save()
	if card_progress.is_favorited == current_favorite_status:
		return Response(status=status.HTTP_404_NOT_FOUND)
	return Response(status=status.HTTP_204_NO_CONTENT)


# class CardProgressDetail(APIView):
# 	authentication_classes = (TokenAuthentication,)
# 	permission_classes = (IsAuthenticated,)
#
# 	def get_object(self, pk):
# 		try:
# 			return CardProgress.objects.get(pk=pk)
# 		except CardProgress.DoesNotExist:
# 			raise Http404
#
# 	def get(self, request, pk, format=None):
# 		card_progress = self.get_object(pk)
# 		serializer = CardProgressSerializer(card_progress)
# 		return Response(serializer.data)
#
# 	def put(self, request, pk, format=None):
# 		card_progress = self.get_object(pk)
# 		serializer =  CardProgressSerializer(card_progress, data=request.data)
# 		card_progress = CardProgress.objects.get(card=card, user=self.request.user)
# 		card_progress.is_completed = True
# 		card_progress.save()
# 		return Response(status=status.HTTP_204_NO_CONTENT)
