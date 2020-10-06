from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Card


class CardSerializer(serializers.ModelSerializer):
	class Meta:
		model = Card
		fields = ('id', 'title', 'deck', 'category', 'difficulty', 'duration', 'view_count', 'content')