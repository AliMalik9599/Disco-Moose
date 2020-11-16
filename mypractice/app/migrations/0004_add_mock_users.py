from django.db import migrations, models
from django.contrib.auth.models import User


def add_mock_user1(apps, schema_editor):
	mock_user1 = User.objects.create_user(first_name='john', is_superuser=True, username='lennon', password='johnpassword')
	mock_user1.save()
	mock_user2 = User.objects.create_user(first_name='Admin', is_superuser=True, username='admin', password='admin')
	mock_user2.save()


class Migration(migrations.Migration):

	dependencies = [
		('app', '0003_add_mock_guitar_course'),  # the name of the migration before this migration
	]

	operations = [
		migrations.RunPython(add_mock_user1) # the name of the function we declared
	]