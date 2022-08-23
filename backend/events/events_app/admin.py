from django.contrib import admin
from .models import UserVO, Activity, Event

# Register your models here.

class UserVOAdmin(admin.ModelAdmin):
    pass

class ActivityAdmin(admin.ModelAdmin):
    pass

class EventAdmin(admin.ModelAdmin):
    pass

admin.site.register(UserVO, UserVOAdmin)
admin.site.register(Activity, ActivityAdmin)
admin.site.register(Event, EventAdmin)