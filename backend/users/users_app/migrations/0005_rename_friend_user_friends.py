# Generated by Django 4.0.3 on 2022-08-29 21:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users_app", "0004_alter_user_friend"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="friend",
            new_name="friends",
        ),
    ]
