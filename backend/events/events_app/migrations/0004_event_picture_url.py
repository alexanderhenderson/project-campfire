# Generated by Django 4.0.3 on 2022-08-30 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "events_app",
            "0003_uservo_email_uservo_first_name_uservo_last_name_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="picture_url",
            field=models.URLField(blank=True, null=True),
        ),
    ]
