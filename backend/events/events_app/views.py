import json

from common.json import ModelEncoder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Activity, Event, UserVO


class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = [
        "id",
        "name",
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
        return JsonResponse(
            {"Events": events},
            encoder=EventEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def show_event(request, pk):
    try:
        event = Event.objects.get(id=pk)
        return JsonResponse(
            {"Event": event},
            encoder=EventEncoder,
            safe=False,
        )
    except Event.DoesNotExist:
        print("Event does not exist.")


@require_http_methods(["GET"])
def list_users_events(request,pk):
    if request.method == "GET":
        users_events = Event.objects.all().filter(pk=UserVO.id)
        return JsonResponse(
            {"User's Events": users_events},
            encoder=EventEncoder,
            safe=False,
        )

