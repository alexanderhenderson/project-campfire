from common.json import ModelEncoder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Activity, Event, UserVO
import json


class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = [
        "id",
        "name",
    ]

    def default(self, o):

        print("UserVO Default called", type(o))
        a = super().default(o)
        print("End user default call: ", a)
        return a

class ActivityEncoder(ModelEncoder):
    model = Activity
    properties = [
        "id",
        "name"
    ]

class EventEncoder(ModelEncoder):
    model = Event
    properties = [
        "id",
        "name",
        "latitude",
        "longitude",
        "start",
        "end",
        "description",
        "owner",
        "activity",
        "attendees",
    ]
    encoders = {
        "activity": ActivityEncoder(),
        "owner": UserVOEncoder(),
        "attendees": UserVOEncoder()
    }

    # def get_extra_data(self, o):
    #     return {
    #         "attendees": o.attendees_set.all(),
    #         }



# # Create your views here.
@require_http_methods(["GET", "POST"])
def list_all_events(request):
    if request.method == "GET":
        events = Event.objects.all()
        return JsonResponse(
            {"Events": events},
            encoder=EventEncoder,
            safe=False,
        )
    if request.method == "POST":
        content = json.loads(request.body)
        content['owner'] = UserVO.objects.get(id=content['owner'])
        content['activity'] = Activity.objects.get(id=content['activity'])
        event = Event.objects.create(**content)
        return JsonResponse(
            {"Event": event},
            encoder=EventEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def show_event(request, pk):
    if request.method == "GET":
        try:
            event = Event.objects.get(id=pk)
            return JsonResponse(
                {"Event": event},
                encoder=EventEncoder,
                safe=False,
            )
        except Event.DoesNotExist:
            return JsonResponse(
            "Event does not exist.",
            status=400
            )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            if content['owner']:
                content['owner'] = UserVO.objects.get(id=content['owner'])
            if content['activity']:
                content['activity'] = Activity.objects.get(id=content['activity'])
            Event.objects.filter(id=pk).update(**content)
            event = Event.objects.get(id=pk)
        except Event.DoesNotExist:
            return JsonResponse(
                "Event does not exist",
                status=400
            )
        return JsonResponse(
            {"Event": event},
            encoder=EventEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        Event.objects.get(id=pk).delete()
        count, _ = Event.objects.filter(id=pk).delete()
        return JsonResponse({"Deleted": count == 0})

@require_http_methods(["GET"])
def list_users_events(request,pk):
    if request.method == "GET":
        logged_in_user = UserVO.objects.filter(id=pk)
        users_events = Event.objects.all().filter(attendees=logged_in_user)
        return JsonResponse(
            {"User's Events": users_events},
            encoder=EventEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_all_activities(request):
    if request.method == "GET":
        activities = Activity.objects.all()
        return JsonResponse(
            {"Activities": activities},
            encoder=ActivityEncoder,
            safe=False,
        )
    if request.method == "POST":
        content = json.loads(request.body)
        activities = Activity.objects.create(**content)
        return JsonResponse(
            {"Activities": activities},
            encoder=ActivityEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def show_activity(request, pk):
    if request.method == "GET":
        try:
            activity = Activity.objects.get(id=pk)
            return JsonResponse(
                {"Activity": activity},
                encoder=ActivityEncoder,
                safe=False,
            )
        except Activity.DoesNotExist:
            return JsonResponse(
                "Activity does not exist.",
                status=400
                )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            Activity.objects.filter(id=pk).update(**content)
            activity = Activity.objects.get(id=pk)
        except Activity.DoesNotExist:
            return JsonResponse(
                "Activity does not exist",
                status=400
            )
        return JsonResponse(
            {"Activity": activity},
            encoder=ActivityEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        Activity.objects.get(id=pk).delete()
        count, _ = Activity.objects.filter(id=pk).delete()
        return JsonResponse({"Deleted": count == 0})

