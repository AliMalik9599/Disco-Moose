from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Card, Course, User, Skill


class CourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Course
		fields = ('id', 'name', 'description', 'num_skills', 'num_cards')


class SkillSerializer(serializers.ModelSerializer):
	course = serializers.StringRelatedField(many=False)

	class Meta:
		model = Skill
		fields = ('id', 'name', 'description', 'num_levels', 'num_cards', 'course')


class CardSerializer(serializers.ModelSerializer):
	course = serializers.StringRelatedField(many=False)
	skill = serializers.StringRelatedField(many=False)
	is_complete = serializers.StringRelatedField(many=False)
	is_favorited = serializers.StringRelatedField(many=False)

	class Meta:
		model = Card
		fields = ('id', 'title', 'course', 'skill', 'level', 'duration', 'view_count', 'content', 'is_complete', 'is_favorited')


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('id', 'name', 'username', 'password')
