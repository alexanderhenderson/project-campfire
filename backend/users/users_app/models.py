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


class Comment(models.Model):
    comment = models.TextField(null=True, blank=True)
    time_posted = models.DateTimeField(auto_now_add=True)
    commenter = models.ForeignKey(
        User,
        related_name="commenters",
        on_delete=models.PROTECT,
    )
    user_profile = models.ForeignKey(
        User, related_name="comment_location", on_delete=models.PROTECT
    )

    def __str__(self):
        return f"{self.commenter} to {self.user_profile}: {self.comment}"
