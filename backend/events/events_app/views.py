<<<<<<< backend/events/events_app/views.py
=======
import json

from common.json import ModelEncoder
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from .models import Activity, Event, UserVO


<<<<<<< backend/events/events_app/views.py
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
        return JsonResponse(
            {"Events": events},
            encoder=EventEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def list_users_events(request):
    pass
=======
# class EventEncoder(ModelEncoder):
#     model = Event
#     properties = [
#         "name",
#         "activity",
#         "latitude",
#         "longitude",
#         "start_date",
#         "end_date",
#         "description",
#         "owner",
#         "attendees",
#     ]
#     # encoders = {
#     #     "activity": ActivityEncoder(),
#     #     "owner": LocationEncoder()
#     #     }


# # Create your views here.
# @require_http_methods(["GET", "POST"])
# def list_all_events(request):
#     if request.method == "GET":
#         events = Event.objects.all()
#         return JsonResponse(
#             {"events": events},
#             encoder=EventEncoder,
#             safe=False,
#         )
    #POST        
    # else:
    #     content = json.loads(request.body) 
    #     try:
    #         employee_number = content["technician"]
    #         technician = Technician.objects.get(employee_number=employee_number)
    #         content["technician"] = technician
    #     except Technician.DoesNotExist:
    #         return JsonResponse(
    #             {"message": "Not a Valid Employee Number"},
    #             status=400,
    #         )

    #     event = Events.objects.create(**content)
>>>>>>> backend/events/events_app/views.py

@require_http_methods(["GET"])
def list_event_detail(request):
    pass
