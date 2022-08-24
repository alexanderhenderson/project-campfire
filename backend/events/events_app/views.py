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

# class SaleEncoder(ModelEncoder):
#     model = Sale
#     properties = [
#         "id",
#         "price",
#         "salesrep",
        
#         "customer",
#         "automobile",
#     ]
#     encoders = {
#         "salesrep": SalesRepEncoder(),
#         "customer": CustomerEncoder(),
#         "automobile": AutomobileVOEncoder(),
#     }

    # def get_extra_data(self, o):
    #     return {
    #         "salesrep": o.salesrep.name,
    #         "employeenumber": o.salesrep.employeenumber,
    #         "customer": o.customer.name,
    #         "automobile": o.automobile.vin,
    #         }


# # Create your views here.
@require_http_methods(["GET", "POST"])
def list_all_events(request):
    if request.method == "GET":
        
        # complete queryset including manyrelationmanager 
        events = Event.objects.all()

        # "dictionary" queryset ignoring the attendees / manyrelationmanager
        #dict_events = Event.objects.all().defer("attendees").values()
        dict_events = Event.objects.all().values()
        
        dict_events = Event.objects.all().values()

        print("query: ", events)
        print("attendees query: ", events[0].attendees)
        print("attendees query type: ", type(events[0].attendees))
        print("dict query: ", dict_events)

        result = []
        
        # iterating trough a .values() queryset returns plain dictionary
        # objects
        for i in range(len(dict_events)):

            # the plain dictionary returned from dict_events[i]
            # is stored in a holding variable
            event_hold = dict_events[i]
            dict_hold = []

            # looping through attendees dictionary values and
            # adding them to a holding value
            for dic in events[i].attendees.all().values():
                dict_hold.append(dic)
                print("dictionary: ", dic)

            print("Attendees object dict: ", events[0].attendees.all().values())

            # adding "attendees" key and setting value equal to
            # list of attendees dictionary key-value pairs
            event_hold["attendees"] = dict_hold
            
            # adding current event dictionary to result list
            result.append(event_hold)

        return JsonResponse(
            {"Events": result},
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