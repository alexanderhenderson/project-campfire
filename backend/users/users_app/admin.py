from django.contrib import admin
from .models import User, ActivityVO, Comment


class ActivityVOAdmin(admin.ModelAdmin):
    pass


class UserAdmin(admin.ModelAdmin):
    pass


class CommentAdmin(admin.ModelAdmin):
    readonly_fields = ('time_posted',)


admin.site.register(ActivityVO, ActivityVOAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)
