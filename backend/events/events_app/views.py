import json

from common.json import ModelEncoder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Activity, Event, UserVO


class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = [
        "name"
    ]

    def default(self, o):

        print("UserVO Default called", type(o))
        a = super().default(o)
        print("End user default call: ", a)
        return a




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

@require_http_methods(["GET"])
def list_users_events(request):
    pass

@require_http_methods(["GET"])
def list_event_detail(request):
    pass
