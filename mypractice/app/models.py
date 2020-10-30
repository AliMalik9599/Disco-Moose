from django.db import models


# Objects representing the users of our web app
class User(models.Model):
	name = models.CharField(max_length=20, default='', null=False)
	username = models.CharField(max_length=50, default='', null=False)
	password = models.CharField(max_length=50, default='', null=False)


# Courses represent broad subjects a user wants to master, like "Guitar". Each course has a set of skills and each skill
# has a set of cards the user must complete.
class Course(models.Model):
	name = models.CharField(max_length=20, default='', null=False)
	description = models.CharField(max_length=300, default='', null=False)
	num_skills = models.IntegerField(default=0)
	num_cards = models.IntegerField(default=0)

	def __str__(self):
		return '%s' % self.name


# CourseProgress, much like SkillProgress, keeps track of a certain user's progress in a course. Like, how many skills
# they have mastered and how many skills they have left to master.
class CourseProgress(models.Model):
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	skills_completed = models.IntegerField(default=0)
	num_course_skills = models.IntegerField(default=0)
	completed_status = models.BooleanField(blank=False, default=False)


# Skills represent something a user wants to learn, like "Finger Picking". Many skills make up one Course.
class Skill(models.Model):
	name = models.CharField(max_length=20, default='', null=False)
	description = models.CharField(max_length=300, default='', null=True)
	num_levels = models.IntegerField(default=0)
	num_cards = models.IntegerField(default=0)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)

	def __str__(self):
		return '%s' % self.name


# SkillProgress helps us keep track of a certain user's progress on a certain skill. This includes what level they are
# on in that skill, how many cards from that skill they have completed, and how many cards they have left.
class SkillProgress(models.Model):
	skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	current_level = models.IntegerField(default=0)
	cards_completed = models.IntegerField(default=0)
	num_skill_cards = models.IntegerField(default=0)
	completed_status = models.BooleanField(blank=False, default=False)


# Cards hold individual, actionable tasks like "Practice finger picking for 20 minutes". Many cards make up one Skill.
class Card(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)
	skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
	level = models.IntegerField(default=0)
	duration = models.IntegerField(default=0)
	view_count = models.IntegerField(default=0)
	content = models.CharField(max_length=500, default='', null=False)

	def __str__(self):
		return '%s in deck %s' % (self.title, self.deck.name)


# CardProgress helps us keep track of a user's relationship with a certain card. This includes whether the user has
# marked a card as completed or if a user has favorited this card.
class CardProgress(models.Model):
	card = models.ForeignKey(Card, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	is_completed = models.BooleanField(blank=False, default=False)
	is_favorited = models.BooleanField(blank=False, default=False)


# Settings represents a certain user's preferences when it comes to notifications and other things.
class Settings(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	notifications = models.BooleanField(blank=True, default=True)
	sounds = models.BooleanField(blank=True, default=True)
	password = models.CharField(max_length=50, default='', null=False)


# The models below are not being used yet / aren't developed well enough yet.

# Is this necessary?
# class MyPractice(models.Model):
# 	num_users = models.IntegerField(default=0)
# 	num_topics = models.IntegerField(default=0)
#
# We need to think this model through more
# class DailySchedule(models.Model):
# 	card_list = models.ManyToManyField(Card)
#
# We need to think this model through more
# class Calendar(models.Model):
# 	list_of_courses = models.ManyToManyField(Course)

# I believe Skill is replacing Goal
# class Goal(models.Model):
# 	title = models.CharField(max_length=50, default='', null=False)
# 	objective = models.CharField(max_length=100, default='', null=False)
# 	time_until_completion = models.IntegerField(default=0)
# 	completed_status = models.BooleanField(blank=False, default=False)
