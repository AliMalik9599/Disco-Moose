from django.shortcuts import render
from .models import Card, User, Course, Skill, CardProgress
from .serializer import CardSerializer, CourseSerializer, SkillSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.views.generic.detail import DetailView
from http import HTTPStatus
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict


# Create your views here.

class CourseList(generics.ListCreateAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer


class CardList(generics.ListCreateAPIView):
	queryset = Card.objects.all()
	serializer_class = CardSerializer

	def get_queryset(self):
		courseid = self.kwargs.get('courseid')
		course = Course.objects.get(id=courseid)
		skills = self.kwargs.get('skills')
		skill_list = skills.split(',')
		skill1 = skill_list[0]
		skill_obj1 = Skill.objects.get(id=skill1)
		queryset = Card.objects.filter(course=course, skill=skill_obj1)

		for skill in skill_list:
			skill_obj = Skill.objects.get(id=skill)
			subset_cards = Card.objects.filter(course=course, skill=skill_obj)
			queryset = queryset | subset_cards
		return queryset


def get_cards_with_progress(request, courseid, skills, userid):
	course = Course.objects.get(id=courseid)
	user = User.objects.get(id=userid)
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

	response = JsonResponse(card_list, safe=False)

	return response


class SkillList(generics.ListCreateAPIView):
	queryset = Skill.objects.all()
	serializer_class = SkillSerializer


def get_user_login(request, name, username, password):
	try:
		user = model_to_dict(User.objects.get(name=name, username=username, password=password))
	except Exception as e:
		user = {}
	response = JsonResponse(user, safe=False)
	return response





