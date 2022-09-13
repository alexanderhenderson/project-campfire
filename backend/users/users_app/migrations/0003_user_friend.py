# Generated by Django 4.0.3 on 2022-08-29 21:39

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users_app", "0002_user_favorite_activities"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="friend",
            field=models.ManyToManyField(
                blank=True, related_name="friend", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
