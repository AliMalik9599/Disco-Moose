from django.db import migrations, models
from app.models import User


def add_mock_user(apps, schema_editor):
	mock_user = User(name='Admin', username='admin', password='admin');
	mock_user.save();


class Migration(migrations.Migration):

	dependencies = [
		('app', '0004_auto_20201016_1844'),  # the name of the migration before this migration
	]

	operations = [
		migrations.RunPython(add_mock_user) # the name of the function we declared
	]
