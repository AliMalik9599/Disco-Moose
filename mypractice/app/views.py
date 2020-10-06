from django.shortcuts import render
from .models import Card
from .serializer import CardSerializer
from rest_framework import generics


# Create your views here.
class CardList(generics.ListCreateAPIView):
	queryset = Card.objects.all()
	serializer_class = CardSerializer
