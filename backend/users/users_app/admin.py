from django.contrib import admin
from .models import User, ActivityVO
from django.contrib.auth.admin import UserAdmin


admin.site.register(ActivityVO)
admin.site.register(User, UserAdmin)
