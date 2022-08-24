from django.urls import path, include
from .views import list_all_events, list_users_events


urlpatterns = [
    path('', list_all_events, name='list_events'),
    path('users_events/<int:pk>/', list_users_events, name='list_users_events'),
]
