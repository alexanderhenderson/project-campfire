# Generated by Django 4.0.3 on 2022-08-27 00:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events_app', '0002_alter_event_attendees_alter_event_owner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='uservo',
            old_name='name',
            new_name='username',
        ),
    ]
