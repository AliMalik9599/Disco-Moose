from __future__ import unicode_literals

from django.db import migrations, models
from app.models import Deck, Card


def add_mock_data(apps, schema_editor): #declare a function to add this data
    d = Deck(name='Guitar')
    d.save()

    c1 = Card(title='Perfect 4th', deck=d, category='Transcribing', difficulty=1, duration=5, view_count=0, content='Lorem ipsum')
    c1.save()
    c2 = Card(title='Perfect 5th', deck=d, category='Transcribing', difficulty=1, duration=5, view_count=0, content='Lorem ipsum')
    c2.save()
    c3 = Card(title='Minor 3rd', deck=d, category='Transcribing', difficulty=3, duration=5, view_count=0, content='Lorem ipsum')
    c3.save()
    c4 = Card(title='Major 3rd', deck=d, category='Transcribing', difficulty=2, duration=5, view_count=0, content='Lorem ipsum')
    c4.save()
    c5 = Card(title='Perfect Unison', deck=d, category='Transcribing', difficulty=1, duration=5, view_count=0, content='Lorem ipsum')
    c5.save()
    c6 = Card(title='Modes', deck=d, category='Knowledge', difficulty=2, duration=15, view_count=0, content='Lorem ipsum')
    c6.save()
    c7 = Card(title='Triad arpeggios', deck=d, category='Knowledge', difficulty=2, duration=15, view_count=0, content='Lorem ipsum')
    c7.save()
    c8 = Card(title='Triads', deck=d, category='Knowledge', difficulty=2, duration=15, view_count=0, content='Lorem ipsum')
    c8.save()
    c9 = Card(title='Seventh arpeggios', deck=d, category='Knowledge', difficulty=3, duration=15, view_count=0, content='Lorem ipsum')
    c9.save()
    c10 = Card(title='Reptilia', deck=d, category='Repertoire', difficulty=3, duration=15, view_count=0, content='Lorem ipsum')
    c10.save()
    c11 = Card(title='People Everywhere (Still Alive)', deck=d, category='Repertoire', difficulty=4, duration=15, view_count=0, content='Lorem ipsum')
    c11.save()
    c12 = Card(title='Im In Your Mind', deck=d, category='Repertoire', difficulty=1, duration=15, view_count=0, content='Lorem ipsum')
    c12.save()
    c13 = Card(title='Summertime', deck=d, category='Repertoire', difficulty=5, duration=15, view_count=0, content='Lorem ipsum')
    c13.save()
    c14 = Card(title='Golden Brown', deck=d, category='Repertoire', difficulty=3, duration=15, view_count=0, content='Lorem ipsum')
    c14.save()
    c15 = Card(title='Minimum Movement Exercise', deck=d, category='Technique', difficulty=2, duration=10, view_count=0, content='Lorem ipsum')
    c15.save()
    c16 = Card(title='Finger Gym', deck=d, category='Technique', difficulty=2, duration=10, view_count=0, content='Lorem ipsum')
    c16.save()
    c17 = Card(title='Quality Control Exercise', deck=d, category='Technique', difficulty=2, duration=10, view_count=0, content='Lorem ipsum')
    c17.save()
    c18 = Card(title='Spider Exercise', deck=d, category='Technique', difficulty=2, duration=10, view_count=0, content='Lorem ipsum')
    c18.save()
    c19 = Card(title='Scale Picking', deck=d, category='Technique', difficulty=2, duration=10, view_count=0, content='Lorem ipsum')
    c19.save()
    c20 = Card(title='A Minor Improvisation', deck=d, category='Improvisation', difficulty=2, duration=15, view_count=0, content='Lorem ipsum')
    c20.save()
    c21 = Card(title='G Minor Improvisation', deck=d, category='Improvisation', difficulty=2, duration=15, view_count=0, content='Lorem ipsum')
    c21.save()
    c22 = Card(title='Chord Tone Improvisation', deck=d, category='Improvisation', difficulty=4, duration=15, view_count=0, content='Lorem ipsum')
    c22.save()
    c23 = Card(title='Pentatonic Blues Improvisation', deck=d, category='Improvisation', difficulty=1, duration=15, view_count=0, content='Lorem ipsum')
    c23.save()
    c24 = Card(title='A Myxolidian Improvisation', deck=d, category='Improvisation', difficulty=3, duration=15, view_count=0, content='Lorem ipsum')
    c24.save()
    c25 = Card(title='Seventh chords', deck=d, category='Knowledge', difficulty=3, duration=15, view_count=0, content='Lorem ipsum')
    c25.save()



class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20201006_2101'),  # the name of the migration before this migration
    ]

    operations = [
        migrations.RunPython(add_mock_data) # the name of the function we declared
    ]