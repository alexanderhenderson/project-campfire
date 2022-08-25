from django.urls import path, include
from .views import list_all_events, list_users_events, show_event


urlpatterns = [
    path('', list_all_events, name='list_events'),
    path('user/<int:pk>/', list_users_events, name='list_users_events'),
    path('<int:pk>/', show_event, name='event_details'),
]
