# Generated by Django 4.0.3 on 2022-08-29 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorite_activities',
            field=models.ManyToManyField(blank=True, related_name='activities', to='users_app.activityvo'),
        ),
    ]
