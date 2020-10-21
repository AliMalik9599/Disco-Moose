from django.shortcuts import render
from .models import Card, User, Course, Skill
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





