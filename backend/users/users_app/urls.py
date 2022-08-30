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
    #login/logout/web token paths
    path("signup/", SignInView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("api/tokens/mine/", api_user_token, name="user_token"),
    
    # other request endpoints
    path("", list_users, name="api_list_users"),
    path("<int:pk>/", user_detail, name="api_user_detail"),
    path("activities/", list_activities, name="api_list_activities"),
    path("activities/<int:pk>/", activity_detail, name="api_activity_details"),

]