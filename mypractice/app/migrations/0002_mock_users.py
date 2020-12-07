from django.db import migrations, models
from django.contrib.auth.models import User
import datetime


def add_mock_user1(apps, schema_editor):
	mock_user1 = User.objects.create_user(first_name='Admin', is_superuser=True, username='admin', password='admin', last_login=datetime.date.today())
	mock_user1.save()


class Migration(migrations.Migration):

	dependencies = [
		('app', '0001_initial'),  # the name of the migration before this migration
	]

	operations = [
		migrations.RunPython(add_mock_user1) # the name of the function we declared
	]