from typing_extensions import Required
from django.db import models

from django.contrib.auth.models import AbstractUser


# Create your models here.
    
# way to get user  
# User = settings.AUTH_USER_MODEL

class User(AbstractUser):
    # name = models.CharField(max_length=100)
    #friend = models.ManyToManyField("user", blank=True)
    profile_description = models.TextField(null=True, blank=True)
    
    # stretch goal - store in mongo
    profile_photo = models.URLField(null=True, blank=True)
    # email = models.EmailField()

    # front end may end up filtering this
    city = models.CharField(max_length=150)
    state = models.CharField(max_length=2)
    #favorite_activities = models.ManyToManyField("ActivityVO")
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.username

class ActivityVO(models.Model):
    name = models.CharField(max_length=300)
