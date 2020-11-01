from django.db import migrations, models
from django.contrib.auth.models import User


def add_mock_user1(apps, schema_editor):
    mock_user1 = User.objects.create_user(first_name='john', username='lennon', password='johnpassword')
    mock_user1.save();


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_add_mock_data'),  # the name of the migration before this migration
    ]

    operations = [
        migrations.RunPython(add_mock_user1) # the name of the function we declared
    ]