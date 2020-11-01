# Generated by Django 2.2.7 on 2020-10-19 02:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20201016_1844'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=20)),
                ('description', models.CharField(default='', max_length=300)),
                ('num_skills', models.IntegerField(default=0)),
                ('num_cards', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='CourseProgress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skills_completed', models.IntegerField(default=0)),
                ('num_course_skills', models.IntegerField(default=0)),
                ('completed_status', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=20)),
                ('description', models.CharField(default='', max_length=300, null=True)),
                ('num_levels', models.IntegerField(default=0)),
                ('num_cards', models.IntegerField(default=0)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Course')),
            ],
        ),
        migrations.CreateModel(
            name='SkillProgress',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_level', models.IntegerField(default=0)),
                ('cards_completed', models.IntegerField(default=0)),
                ('num_skill_cards', models.IntegerField(default=0)),
                ('completed_status', models.BooleanField(default=False)),
                ('skill', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Skill')),
            ],
        ),
        migrations.RemoveField(
            model_name='calendar',
            name='list_of_topics',
        ),
        migrations.RemoveField(
            model_name='dailyschedule',
            name='card_list',
        ),
        migrations.DeleteModel(
            name='Goal',
        ),
        migrations.DeleteModel(
            name='MyPractice',
        ),
        migrations.RenameField(
            model_name='card',
            old_name='difficulty',
            new_name='level',
        ),
        migrations.RemoveField(
            model_name='card',
            name='category',
        ),
        migrations.RemoveField(
            model_name='card',
            name='deck',
        ),
        migrations.AddField(
            model_name='card',
            name='complete',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='settings',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.User'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='card',
            name='content',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.DeleteModel(
            name='Calendar',
        ),
        migrations.DeleteModel(
            name='DailySchedule',
        ),
        migrations.DeleteModel(
            name='Deck',
        ),
        migrations.AddField(
            model_name='skillprogress',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.User'),
        ),
        migrations.AddField(
            model_name='courseprogress',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.User'),
        ),
        migrations.AddField(
            model_name='card',
            name='course',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.Course'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='skill',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app.Skill'),
            preserve_default=False,
        ),
    ]
