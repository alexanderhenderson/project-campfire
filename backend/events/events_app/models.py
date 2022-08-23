from django.db import models


# Create your models here.
class UserVO(models.Model):
    id = models.PositiveBigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'User: {self.id} -{self.name}'


class Activity(models.Model):
    name = models.CharField(max_length=300)
  
    def __str__(self):
        return self.name


class Event(models.Model):
    name = models.Charfield(max_length=100)
    description = models.TextField(null=True, blank=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    owner = models.ForeignKey("User", blank=False, null=False)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    attendees = models.ManyToManyField(UserVO, null=True, blank=True)

    def __str__(self):
        return f'Event Name: {self.name}'