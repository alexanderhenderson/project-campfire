from django.conf import settings
from django.db import models


# Create your models here.
class UserVO(models.Model):
    username = models.CharField(max_length=300)
    id = models.PositiveIntegerField(primary_key=True)

    def __str__(self):
        return f"{self.name}"

class Activity(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.name}"


class Event(models.Model):
    #False means required to fill out
    name = models.CharField(max_length=100, null=False, blank=False)
    description= models.TextField(null=False, blank=False)
    owner = models.ForeignKey(UserVO, blank=False, null=False, related_name="owners", on_delete=models.PROTECT)
    activity = models.ForeignKey(Activity, null=False, blank=False, related_name="activities", on_delete=models.PROTECT)
    start = models.DateTimeField(null=False, blank=False)
    end = models.DateTimeField(null=False, blank=False)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    attendees=models.ManyToManyField(UserVO, blank=True, related_name="users")

    def __str__(self):
        return f"{self.name}"
