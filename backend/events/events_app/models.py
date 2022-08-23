from django.db import models

# Create your models here.
class Events(models.Model):
    name = models.CharField(max_length=100)
    # activity = models.ForeignKey(ActivityVO, related_name="activities", on_delete=models.PROTECT)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description= models.TextField(null=False, blank=False)
    # owner = models.ForeignKey(UserVO, blank=False, null=False)
    attendees=models.ManyToManyField("User",blank=True)

    def __str__(self):
        return f"Event name: {self.name}"