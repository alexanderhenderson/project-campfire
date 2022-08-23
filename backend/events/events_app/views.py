from multiprocessing import Event
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Events
from django.http import JsonResponse
import json
from common.json import ModelEncoder

class EventEncoder(ModelEncoder):
    model = Events
    properties = [
        "name",
        "location",
        "start_date",
        "end_date",
        "description",
        "attendees",
    ]
    # encoders = {
    #     "activity": ActivityEncoder(),
    #     "owner": LocationEncoder()
    #     }


# Create your views here.
@require_http_methods(["GET", "POST"])
def list_all_events(request):
    if request.method == "GET":
        events = Events.objects.all()
        return JsonResponse(
            {"events": events},
            encoder=EventEncoder,
            safe=False,
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