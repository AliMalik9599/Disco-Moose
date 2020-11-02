from django.shortcuts import render
from .models import Card, Course, Skill, CardProgress
from django.shortcuts import render, redirect
from .serializer import CardSerializer, CourseSerializer, SkillSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.views.generic.detail import DetailView
from http import HTTPStatus
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib import messages
import json
from django.core import serializers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes


# Create your views here.
class CourseList(generics.ListCreateAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	authentication_classes = (TokenAuthentication,)
	permission_classes = (IsAuthenticated,)


# @api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def get_courses(request):
	print("COURSE / AUTHENTICATED?")
	print(request.user.is_authenticated)
	print(request.session.keys())
	courses = HttpResponse(serializers.serialize("json", Course.objects.all()))

	return courses


class CardList(generics.ListCreateAPIView):
	queryset = Card.objects.all()
	serializer_class = CardSerializer
	permission_classes = (IsAuthenticated,)

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

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_cards_with_progress(request, courseid, skills):
	userid = request.user
	print("USER: " + str(request.user))
	print(request.user.is_authenticated)
	course = Course.objects.get(id=courseid)
	user = User.objects.get(id=userid.id)
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

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_skills(request):
	print("SKILL / AUTHENTICATED?")
	print(request.user.is_authenticated)
	skills = HttpResponse(serializers.serialize("json", Skill.objects.all()))

	return skills


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_login(request, name, username, password):
	print(request.session.keys())
	#print(request.method)
	message = "start"
	if request.method == 'GET':
		user = authenticate(username=username, password=password)

		if user is not None:
			login(request, user)
			print("AUTHENTICATED???")
			print(user.is_authenticated)
			print(request.session.keys())
			message = "success"
		else:
			message = "failed"


	response = JsonResponse({'next': message}, safe=False)
	return response
