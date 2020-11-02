from .models import Card, Course, Skill, CardProgress
from .serializer import CardSerializer, CourseSerializer, SkillSerializer
from rest_framework import generics
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


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

		return card_list
