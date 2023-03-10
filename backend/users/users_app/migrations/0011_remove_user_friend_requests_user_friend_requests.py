# Generated by Django 4.0.3 on 2022-09-21 20:13

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users_app", "0010_user_friend_requests"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="friend_requests",
        ),
        migrations.AddField(
            model_name="user",
            name="friend_requests",
            field=django.contrib.postgres.fields.ArrayField(
                base_field=models.IntegerField(),
                blank=True,
                default=list,
                size=None,
            ),
        ),
    ]
