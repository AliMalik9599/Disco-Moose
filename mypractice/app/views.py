from django.shortcuts import render, redirect
from .models import Card, User, Course, Skill
from .serializer import CardSerializer, CourseSerializer, SkillSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.views.generic.detail import DetailView
from http import HTTPStatus
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
import json


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
	#print(request.method)
	message = "start"
	if request.method == 'GET':
		user = authenticate(username=username, password=password)

		if user is not None:
			#login(request, user)
			message = "success"
		else:
			message = "failed"


	response = JsonResponse({'next': message}, safe=False)
	return response








