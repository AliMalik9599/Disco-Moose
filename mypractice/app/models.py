from django.db import models


class Deck(models.Model):
	name = models.CharField(max_length=10, default='', null=False)
	#category = models.CharField(max_length=10, default='', null=False)

	def __str__(self):
		return '%s' % self.name


class Goal(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	objective = models.CharField(max_length=50, default='', null=False)
	time_until_completion = models.IntegerField(default=0)
	completed_status = models.BooleanField(blank=False, default=False)


class Calendar(models.Model):
	list_of_topics = models.ManyToManyField(Deck)


class User(models.Model):
	name = models.CharField(max_length=50, default='', null=False)
	deck_list = models.ManyToManyField(Deck)
	#goal_list = models.ManyToManyField(Goal)
	#calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)


class MyPractice(models.Model):
	num_users = models.IntegerField(default=0)
	num_topics = models.IntegerField(default=0)


class Card(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	deck = models.ForeignKey(Deck, on_delete=models.CASCADE, null=True)
	category = models.CharField(max_length=10, default='', null=False)
	difficulty = models.IntegerField(default=0)
	duration = models.IntegerField(default=0)
	view_count = models.IntegerField(default=0)
	content = models.CharField(max_length=50, default='', null=False)

	def __str__(self):
		return '%s in deck %s' % (self.title, self.deck.name)


class DailySchedule(models.Model):
	card_list = models.ManyToManyField(Deck)


class Settings(models.Model):
	notifications = models.BooleanField(blank=True, default=True)
	sounds = models.BooleanField(blank=True, default=True)
	password = models.CharField(max_length=50, default='', null=False)
