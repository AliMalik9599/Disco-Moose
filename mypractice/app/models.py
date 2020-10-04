from django.db import models


class Topic(models.Model):
	name = models.CharField(max_length=10, default='', null=False)
	category = models.CharField(max_length=10, default='', null=False)


class Goal(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	objective = models.CharField(max_length=50, default='', null=False)
	time_until_completion = models.IntegerField(default=0)
	completed_status = models.BooleanField(blank=False, default=False)


class Calendar(models.Model):
	list_of_topics = models.ManyToManyField(Topic)


class User(models.Model):
	name = models.CharField(max_length=50, default='', null=False)
	topic_list = models.ManyToManyField(Topic)
	goal_list = models.ManyToManyField(Goal)
	calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)


class MyPractice(models.Model):
	num_users = models.IntegerField(default=0)
	num_topics = models.IntegerField(default=0)


class Card(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
	category = models.CharField(max_length=10, default='', null=False)
	difficulty = models.IntegerField(default=0)
	duration = models.IntegerField(default=0)
	view_count = models.IntegerField(default=0)
	content = models.CharField(max_length=50, default='', null=False)


class DailySchedule(models.Model):
	card_list = models.ManyToManyField(Topic)


class Settings(models.Model):
	notifications = models.BooleanField(blank=True, default=True)
	sounds = models.BooleanField(blank=True, default=True)
	password = models.CharField(max_length=50, default='', null=False)
