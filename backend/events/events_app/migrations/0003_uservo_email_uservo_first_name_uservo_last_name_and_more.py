# Generated by Django 4.0.3 on 2022-08-29 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "events_app",
            "0002_remove_uservo_email_remove_uservo_first_name_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="uservo",
            name="email",
            field=models.EmailField(blank=True, max_length=254),
        ),
        migrations.AddField(
            model_name="uservo",
            name="first_name",
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name="uservo",
            name="last_name",
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name="uservo",
            name="username",
            field=models.CharField(max_length=150),
        ),
    ]
