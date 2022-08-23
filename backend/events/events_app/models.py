from django.db import models
from django.conf import settings


class UserVO(models.Model):
    name = models.CharField(max_length=300)
    id = models.PositiveIntegerField(primary_key=True)

    def __str__(self):
        return f"Username: {self.name}"

class Activity(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return f"Activity: {self.name}"

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=100)
    activity = models.ForeignKey(Activity, related_name="activities", on_delete=models.PROTECT)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description= models.TextField(null=False, blank=False)
    owner = models.ForeignKey(UserVO, blank=False, null=False)
    attendees=models.ManyToManyField(UserVO,blank=True, null=True)

    def __str__(self):
        return f"Event name: {self.name}"

