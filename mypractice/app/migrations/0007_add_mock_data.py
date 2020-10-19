from __future__ import unicode_literals

from django.db import migrations, models
from app.models import Course, Card, Skill


def add_mock_data(apps, schema_editor): #declare a function to add this data
    d = Course(name='Guitar')
    d.save()

    transcribing = Skill(name="Transcribing", course=d)
    transcribing.save()
    knowledge = Skill(name="Knowledge", course=d)
    knowledge.save()
    repertoire = Skill(name="Repertoire", course=d)
    repertoire.save()
    improvisation = Skill(name="Improvisation", course=d)
    improvisation.save()
    technique = Skill(name="Technique", course=d)
    technique.save()

    c1 = Card(title='Perfect 4th', course=d, skill=transcribing, level=1, duration=5, view_count=0, content='Lorem ipsum')
    c1.save()
    c2 = Card(title='Perfect 5th', course=d, skill=transcribing, level=1, duration=5, view_count=0, content='Lorem ipsum')
    c2.save()
    c3 = Card(title='Minor 3rd', course=d, skill=transcribing, level=3, duration=5, view_count=0, content='Lorem ipsum')
    c3.save()
    c4 = Card(title='Major 3rd', course=d, skill=transcribing, level=2, duration=5, view_count=0, content='Lorem ipsum')
    c4.save()
    c5 = Card(title='Perfect Unison', course=d, skill=transcribing, level=1, duration=5, view_count=0, content='Lorem ipsum')
    c5.save()
    c6 = Card(title='Modes', course=d, skill=knowledge, level=2, duration=15, view_count=0, content='Lorem ipsum')
    c6.save()
    c7 = Card(title='Triad arpeggios', course=d, skill=knowledge, level=2, duration=15, view_count=0, content='Lorem ipsum')
    c7.save()
    c8 = Card(title='Triads', course=d, skill=knowledge, level=2, duration=15, view_count=0, content='Lorem ipsum')
    c8.save()
    c9 = Card(title='Seventh arpeggios', course=d, skill=knowledge, level=3, duration=15, view_count=0, content='Lorem ipsum')
    c9.save()
    c10 = Card(title='Reptilia', course=d, skill=repertoire, level=3, duration=15, view_count=0, content='Lorem ipsum')
    c10.save()
    c11 = Card(title='People Everywhere (Still Alive)', course=d, skill=repertoire, level=4, duration=15, view_count=0, content='Lorem ipsum')
    c11.save()
    c12 = Card(title='Im In Your Mind', course=d, skill=repertoire, level=1, duration=15, view_count=0, content='Lorem ipsum')
    c12.save()
    c13 = Card(title='Summertime', course=d, skill=repertoire, level=5, duration=15, view_count=0, content='Lorem ipsum')
    c13.save()
    c14 = Card(title='Golden Brown', course=d, skill=repertoire, level=3, duration=15, view_count=0, content='Lorem ipsum')
    c14.save()
    c15 = Card(title='Minimum Movement Exercise', course=d, skill=technique, level=2, duration=10, view_count=0, content='Lorem ipsum')
    c15.save()
    c16 = Card(title='Finger Gym', course=d, skill=technique, level=2, duration=10, view_count=0, content='Lorem ipsum')
    c16.save()
    c17 = Card(title='Quality Control Exercise', course=d, skill=technique, level=2, duration=10, view_count=0, content='Lorem ipsum')
    c17.save()
    c18 = Card(title='Spider Exercise', course=d, skill=technique, level=2, duration=10, view_count=0, content='Lorem ipsum')
    c18.save()
    c19 = Card(title='Scale Picking', course=d, skill=technique, level=2, duration=10, view_count=0, content='Lorem ipsum')
    c19.save()
    c20 = Card(title='A Minor Improvisation', course=d, skill=improvisation, level=2, duration=15, view_count=0, content='Lorem ipsum')
    c20.save()
    c21 = Card(title='G Minor Improvisation', course=d, skill=improvisation, level=2, duration=15, view_count=0, content='Lorem ipsum')
    c21.save()
    c22 = Card(title='Chord Tone Improvisation', course=d, skill=improvisation, level=4, duration=15, view_count=0, content='Lorem ipsum')
    c22.save()
    c23 = Card(title='Pentatonic Blues Improvisation', course=d, skill=improvisation, level=1, duration=15, view_count=0, content='Lorem ipsum')
    c23.save()
    c24 = Card(title='A Myxolidian Improvisation', course=d, skill=improvisation, level=3, duration=15, view_count=0, content='Lorem ipsum')
    c24.save()
    c25 = Card(title='Seventh chords', course=d, skill=knowledge, level=3, duration=15, view_count=0, content='Lorem ipsum')
    c25.save()


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20201019_0205'),  # the name of the migration before this migration
    ]

    operations = [
        migrations.RunPython(add_mock_data) # the name of the function we declared
    ]