from django.db import models


# Create your models here.
class UserVO(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    username = models.CharField(max_length=150)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(blank=True)

    EMAIL_FIELD: str = ...

    def __str__(self):
        return f"{self.username} "


class Activity(models.Model):
    name = models.CharField(max_length=300)
    picture_url = models.URLField(null=True)

    def __str__(self):
        return f"{self.name}"


class Event(models.Model):
    # False means required to fill out
    name = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    owner = models.ForeignKey(
        UserVO,
        blank=False,
        null=False,
        related_name="owners",
        on_delete=models.PROTECT
    )
    activity = models.ForeignKey(
        Activity,
        null=False,
        blank=False,
        related_name="activities",
        on_delete=models.PROTECT,
    )
    start = models.DateTimeField(null=False, blank=False)
    end = models.DateTimeField(null=False, blank=False)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    attendees = models.ManyToManyField(
        UserVO,
        blank=True,
        related_name="users"
    )
    picture_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.id}"
