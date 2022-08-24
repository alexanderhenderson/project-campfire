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
        events = Event.objects.all()
        #events = Event.objects.defer("attendees")
        
        print("Original queryset: ", events.values())

        dict_events = events.defer("attendees").values()
        result = []
        for i in range(len(dict_events)):
            print("Loop #: ", i)
            print("Events dictionary loop: ", dict_events[i])
            #result[dict_events[i]["name"]] = dict_events[i]

            event_hold = dict_events[i]
            
            dict_hold = []
            for dic in events[i].attendees.all().values():
                print("In attendees loop, adding dic: ", dic)
                dict_hold.append(dic)
            print("Attendees dict array: ", dict_hold)

            event_hold["attendees"] = dict_hold
            
            result.append(event_hold)

        for dic in events[0].attendees.all().values():
            print("Attendees dictionary loop: ", dic)

        print("Result dictionary: ", result)

        print("Events 0: ", events[0], type(events[0]))

        eventsList = list(events)

        for event in eventsList:
            print("Event list loop: ", event)
            print("Event list loop: ", event.activity)

        
        print("Attendees queryset: ", events[0].attendees.all())

        print("Attendees: ", events[0].attendees)

        print("length of events: ", len(events))

        events2 = Event.objects.defer("attendees")
        print("Events 2 is type: ", type(events2[0]))

        full_queryset = []

        for i in range(len(events)):
            print("testing for loop")
            if i == 0:
                #print("Before failing events2[i] is type: ", type(events2[i].all()))
                full_attendees_queryset = events[i].attendees.all()
                #test = events2[i].name | events[i].attendees.all()

            else:
                full_attendees_queryset = full_attendees_queryset | events[i].attendees.all()
                #test = events2[i].name | events[i].attendees.all()

            
        print("full_attendees_queryset type: ", type(full_attendees_queryset), "full queryset: ", full_attendees_queryset)
            

        for x in events[0].attendees.all():
            print("in for loop")
            print("User name is ", x.name, " and user ID is: ", x.id)
            print("X is type: ", type(x))

        attendees = events[0].attendees.all()


        # defer allows you to create a queryset that ignores a model field
        print("Test line below this might fail")
        print(Event.objects.defer("attendees"))
        print("It didn't fail")

        print(events[0].attendees)
        print("Get request - All events:", events._fields, " Type: ", type(events[0].attendees))

        events2 = Event.objects.defer("attendees")
        # events2 = Event.objects.only("name")

        print("below should fail")
        print(events2[0].__dict__)
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