from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Card, Deck


class DeckSerializer(serializers.ModelSerializer):
	class Meta:
		model = Deck
		fields = ('id', 'name')


class CardSerializer(serializers.ModelSerializer):
	deck = serializers.StringRelatedField(many=False)
	class Meta:
		model = Card
		fields = ('id', 'title', 'deck', 'category', 'difficulty', 'duration', 'view_count', 'content')
