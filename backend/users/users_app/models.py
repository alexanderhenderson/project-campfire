<<<<<<< HEAD
from django.db import models
=======
from typing_extensions import Required
from django.db import models

from django.contrib.auth.models import AbstractUser


# Create your models here.
    
# way to get user  
# User = settings.AUTH_USER_MODEL

class User(AbstractUser):
    name = models.CharField(max_length=100)
    #friend = models.ManyToManyField("user", blank=True)
    profile_description = models.TextField()
    
    # stretch goal - store in mongo
    profile_photo = models.URLField()
    email = models.EmailField()

    # front end may end up filtering this
    city = models.CharField(max_length=150)
    state = models.CharField(max_length=2)
    #favorite_activities = models.ManyToManyField("ActivityVO")


    def __str__(self):
        return self.name

class ActivityVO(models.Model):
    name = models.CharField(max_length=300)
>>>>>>> main
