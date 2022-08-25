from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Event, UserVO, Activity
from django.http import JsonResponse
import json
from common.json import ModelEncoder

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

def list_users_events(request, pk):
    if request.method == "GET":
        user = UserVO.objects.get(id=pk)
        users_events = Event.objects.filter(attendees=user)
        return JsonResponse(
            {"Attendee's Events": users_events},
            encoder=EventEncoder,
            safe=False
        )



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

    #     return JsonResponse(
    #         event,
    #         encoder=EventEncoder,
    #         safe=False,
    #     )