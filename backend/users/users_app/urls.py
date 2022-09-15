from django.urls import path
from .views import (
    list_users,
    user_detail,
    list_activities,
    activity_detail,
    api_user_token,
    api_user_info,
    api_friend_kindler,
    api_friend_detail,
    list_comments,
    comment_detail,
)


urlpatterns = [
    # JWT web token paths
    path("api/tokens/mine/", api_user_token, name="user_token"),
    path("api/tokens/user/", api_user_info, name="user_info"),
    # other request endpoints
    path('', list_users, name='api_list_users'),
    path('api/kindler', api_friend_kindler, name='api_friend_kindler'),
    path('<int:pk>/', user_detail, name='api_user_detail'),
    path('activities/', list_activities, name='api_list_activities'),
    path('activities/<int:pk>/', activity_detail, name='api_activity_details'),
    path('api/friend/', api_friend_detail, name='api_friend_detail'),
    path('comments/', list_comments, name='list_comments'),
    path('comments/<int:pk>/', comment_detail, name='comment_details'),
]
