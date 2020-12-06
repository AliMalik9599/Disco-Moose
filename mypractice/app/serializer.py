from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Card, Course, Skill, Deck


# Serializes Course objects
class CourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Course
		fields = ('id', 'name', 'description', 'num_skills', 'num_cards')


# Serializes Skill objects
class SkillSerializer(serializers.ModelSerializer):
	course = serializers.StringRelatedField(many=False)

	class Meta:
		model = Skill
		fields = ('id', 'name', 'description', 'num_levels', 'num_cards', 'course')


# Serializes Card objects with appended CardProgress values
class CardSerializer(serializers.ModelSerializer):
	course = serializers.StringRelatedField(many=False)
	skill = serializers.StringRelatedField(many=False)
	is_complete = serializers.StringRelatedField(many=False)
	is_favorited = serializers.StringRelatedField(many=False)
	last_completed = serializers.StringRelatedField(many=False)

	class Meta:
		model = Card
		fields = (
			'id',
			'title',
			'course',
			'skill',
			'level',
			'duration',
			'view_count',
			'content',
			'description',
			'link',
			'image_path',
			'is_complete',
			'is_favorited',
			'last_completed'
		)


# Serializes User objects
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'name', 'username', 'password')


# Serializers Deck objects
class DeckSerializer(serializers.ModelSerializer):
	course = CourseSerializer(many=False, read_only=True, allow_null=True)
	skills = serializers.PrimaryKeyRelatedField(many=True, read_only=True, allow_null=True)
	cards = CardSerializer(many=True, read_only=True, allow_null=True)
	user = UserSerializer(many=False)

	class Meta:
		model = Deck
		fields = (
			'id',
			'skills',
			'course',
			'date',
			'cards',
			'user',
			'num_cards'
		)
