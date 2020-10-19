from django.db import models


class Course(models.Model):
	name = models.CharField(max_length=20, default='', null=False)
	description = models.CharField(max_length=100, default='', null=False)
	num_skills = models.IntegerField(default=0)
	num_cards = models.IntegerField(default=0)
	

	
	def __str__(self):
		return '%s' % self.name

class Skill(models.Model):
	name = models.CharField(max_length=20, default='', null=False)
	description = models.CharField(max_length=100, default='', null=False)
	num_levels = models.IntegerField(default=0)
	course_id = models.ForeignKey(Course, on_delete=models.CASCADE)

	
	def __str__(self):
		return '%s' % self.name


class Goal(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	objective = models.CharField(max_length=100, default='', null=False)
	time_until_completion = models.IntegerField(default=0)
	completed_status = models.BooleanField(blank=False, default=False)


class Calendar(models.Model):
	list_of_courses = models.ManyToManyField(Course)


class User(models.Model):
	name = models.CharField(max_length=20, default='', null=False)
	username = models.CharField(max_length=20, default='', null=False)
	password = models.CharField(max_length=20, default='', null=False)
	course_list = models.ManyToManyField(Course)
	goal_list = models.ManyToManyField(Goal)

	calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)


class MyPractice(models.Model):
	num_users = models.IntegerField(default=0)
	num_topics = models.IntegerField(default=0)


class Card(models.Model):
	title = models.CharField(max_length=50, default='', null=False)
	course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
	skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE)
	level = models.IntegerField(default=0)
	duration = models.IntegerField(default=0)
	view_count = models.IntegerField(default=0)
	content = models.CharField(max_length=100, default='', null=False)
	complete = models.BooleanField(blank=False, default=False)

	
	def __str__(self):
		return '%s in deck %s' % (self.title, self.deck.name)


class DailySchedule(models.Model):
	card_list = models.ManyToManyField(Card)


class CourseProgress(models.Model):
	course_id = models.ForeignKey(Course, on_delete=models.CASCADE)
	user_id = models.ForeignKey(User, on_delete=models.CASCADE)
	cards_completed = models.IntegerField(default=0)
	course_cards = models.IntegerField(default=0)


class SkillProgress(models.Model):
	user_id = models.ForeignKey(User, on_delete=models.CASCADE)
	skill_id = models.ForeignKey(Skill, on_delete=models.CASCADE)
	current_level = models.IntegerField(default=0)
	completed_status = models.BooleanField(blank=False, default=False)


class Settings(models.Model):
	notifications = models.BooleanField(blank=True, default=True)
	sounds = models.BooleanField(blank=True, default=True)
	password = models.CharField(max_length=50, default='', null=False)
