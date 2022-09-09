from django.urls import path
from .views import (
    list_all_events,
    list_users_events,
    show_event,
    list_all_activities,
    show_activity,
    list_all_uservos,
)


urlpatterns = [
    path('', list_all_events, name='list_events'),
    path('<int:pk>/', show_event, name='event_details'),
    path('user/<int:pk>/', list_users_events, name='list_users_events'),
    path('activities/', list_all_activities, name='list_activities'),
    path('activity/<int:pk>/', show_activity, name='activity_details'),
    path('uservos/', list_all_uservos, name='list_all_uservos'),
]
