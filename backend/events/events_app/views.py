import json

from common.json import ModelEncoder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Activity, Event, UserVO

# from rest_framework import serializers

# class AttendeesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserVO
#         fields = ['id', 'name']

class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = [
        "name",
        "id"
    ]

class ActivityEncoder(ModelEncoder):
    model = Activity
    properties = [
        "name"
    ]

class EventEncoder(ModelEncoder):
    model = Event
    properties = [
        "id",
        "name",
        "activity",
        "latitude",
        "longitude",
        "start",
        "end",
        "description",
        "owner",
        "attendees",
    ]
    encoders = {
        "activity": ActivityEncoder(),
        "owner": UserVOEncoder(),
        "attendees": UserVOEncoder()
    }

@require_http_methods(["GET", "POST"])
def list_all_events(request):
    if request.method == "GET":
        events = Event.objects.all()
        dict_events = events.defer("attendees").values()
        result = []
        for i in range(len(dict_events)):
            event_hold = dict_events[i]
            dict_hold = []
            for dic in events[i].attendees.all().values():
                dict_hold.append(dic)
            event_hold["attendees"] = dict_hold
            result.append(event_hold)
        return JsonResponse(
            {"Events": result},
            encoder=EventEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_users_events(request):
    pass