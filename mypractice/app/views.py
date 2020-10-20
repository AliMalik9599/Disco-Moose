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
class CardList(generics.ListCreateAPIView):
	queryset = Card.objects.all()
	serializer_class = CardSerializer


class CourseList(generics.ListCreateAPIView):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer

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





