from django.urls import path

from django.contrib.auth.views import LoginView, LogoutView
from .views import (
    list_users,
    user_detail,
    list_activities,
    activity_detail,
    SignInView,
    api_user_token
)


urlpatterns = [
    # JWT web token paths
    path("api/tokens/mine/", api_user_token, name="user_token"),
    
    # other request endpoints
    path("", list_users, name="api_list_users"),
    path("<int:pk>/", user_detail, name="api_user_detail"),
    path("activities/", list_activities, name="api_list_activities"),
    path("activities/<int:pk>/", activity_detail, name="api_activity_details"),

]