from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class ActivityVO(models.Model):
    name = models.CharField(max_length=300)
    id = models.IntegerField(primary_key=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    friends = models.ManyToManyField("self", blank=True)
    profile_description = models.TextField(null=True, blank=True)
    profile_photo = models.URLField(null=True, blank=True)
    city = models.CharField(max_length=150)
    state = models.CharField(max_length=2)
    favorite_activities = models.ManyToManyField(
        ActivityVO, blank=True, related_name="activities"
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
