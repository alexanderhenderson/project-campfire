from django.contrib.auth.forms import UserCreationForm
from django.views.generic import FormView
from django.contrib.auth import login
from django.http.response import HttpResponseRedirect


from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import User, ActivityVO
from django.http import JsonResponse
import json
from common.json import ModelEncoder
import djwto.authentication as auth

# Create your views here.


# @auth.jwt_login_required
@require_http_methods(["GET"])
def api_user_token(request):

    print("-------------------------------")
    print("-------------------------------")
    print("-------------------------------")

    #import djwto.tokens as tokens

    # token_cookies = request.COOKIES
    # print("Access Token: ", token_cookies['jwt_access_token'])
    
    # token_data = request.payload
    # print("Request payload: ", token_data)

    # print("Request dir: ", dir(token_cookies))
    # print("Request: ", token_cookies)


    # print("Request dir: ", dir(request))
    # print("Request: ", request)
    # print("Request.token: ", request.token)
    # print("Request.token type: ", type(request.token))
    # print("Decoded Token: ", tokens.decode_token(request.token))
    # # print("Request META: ", request.META)
    # # print("Token Data: ", token_data)


    # # print("Token testing: ", dir(tokens))
    # # print("Token User: ", tokens.User(request))
    # # print("Decoding Token with pyjwt: ", tokens.pyjwt(token_cookies))

    # print("-------------------------------")
    # print("-------------------------------")
    # print("-------------------------------")
    # print("Request payload: ", token_data)
    # print("Decoded Token: ", tokens.decode_token(request.token))






    if "jwt_access_token" in request.COOKIES:
        token = request.COOKIES["jwt_access_token"]
        #print("Backend - Token: ", token)
        if token:
            return JsonResponse({"token": token})
    response = JsonResponse({"token": None})
    return response

class UserListEncoder(ModelEncoder):
    model = User
    properties = ["id", "username", "first_name", "last_name", "email"]

class ActivityVOEncoder(ModelEncoder):
    model = ActivityVO
    properties = ["id", "name"]

class FriendsEncoder(ModelEncoder):
    model = User
    properties = ["id", "username", "email", "profile_photo"]

class UserDetailEncoder(ModelEncoder):
    model = User
    properties = ["id", "username", "first_name", "last_name", "email", "profile_description", "profile_photo", "city", "state", "favorite_activities", "friends"]
    encoders = {
        "favorite_activities": ActivityVOEncoder(),
        "friends": FriendsEncoder(),
    }

# @auth.jwt_login_required
# def get_some_data(request):
#     token_data = request.payload
#     # do stuff
#     return response

@require_http_methods(["GET", "POST"])
def list_users(request):
    if request.method == "GET":
        print("Printstop 1")
        users = User.objects.all()
        print("Printstop 2")
        return JsonResponse(
            {"users": users},
            encoder=UserListEncoder
        )
    else: # POST
        try:
            print("request: ", request.body)
            content = json.loads(request.body)
            user = User.objects.create(**content)
            print("user: ", user)
            return JsonResponse(
                {"user": user},
                encoder=UserDetailEncoder
            )
        except:
            response = JsonResponse(
                {"message": "something went wrong"}
            )
            response.status_code = 400
            return response       

@require_http_methods(["GET", "PUT", "DELETE"])
def user_detail(request, pk):
    if request.method == "GET":
        try:
            user = User.objects.get(id=pk)
            return JsonResponse(
                user,
                encoder=UserDetailEncoder,
                safe=False
            )
        except User.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            user = User.objects.get(id=pk)
            user.delete()
            return JsonResponse(
                user,
                encoder=UserDetailEncoder,
                safe=False,
            )
        except User.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            user = User.objects.get(id=pk)
            if "favorite_activities" in content:
                activity_id_list = content["favorite_activities"]
                for id in activity_id_list:
                    activity = ActivityVO.objects.get(id=id)
                    user.favorite_activities.add(activity)
            if "friends" in content:
                friends_id_list = content["friends"]
                for id in friends_id_list:
                    friend = User.objects.get(id=id)
                    user.friends.add(friend)
            props = ["username", "first_name", "last_name", "email", "profile_description", "profile_photo", "city", "state"]
            for prop in props:
                if prop in content:
                    setattr(user, prop, content[prop])
            user.save()
            return JsonResponse(
                user,
                encoder=UserDetailEncoder,
                safe=False,
            )
        except User.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def list_activities(request):
    if request.method == "GET":  
        activityVO = ActivityVO.objects.all()
        return JsonResponse(
            {"ActivityVOs": activityVO},
            encoder=ActivityVOEncoder
        )
    else:
        try:
            print(request.body)
            content = json.loads(request.body)
            activityVO = ActivityVO.objects.create(**content)
            print(activityVO)
            return JsonResponse(
                {"activityVO": activityVO},
                encoder=ActivityVOEncoder
            )
        except:
            response = JsonResponse(
                {"message": "something went wrong"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "PUT", "DELETE"])
def activity_detail(request, pk):
    if request.method == "GET":
        try:
            activityVO = ActivityVO.objects.get(id=pk)
            return JsonResponse(
                activityVO,
                encoder=ActivityVOEncoder,
                safe=False
            )
        except ActivityVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            activityVO = ActivityVO.objects.get(id=pk)
            activityVO.delete()
            return JsonResponse(
                activityVO,
                encoder=ActivityVOEncoder,
                safe=False,
            )
        except ActivityVO.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            activityVO = ActivityVO.objects.get(id=pk)

            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(activityVO, prop, content[prop])
            activityVO.save()
            return JsonResponse(
                activityVO,
                encoder=ActivityVOEncoder,
                safe=False,
            )
        except ActivityVO.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

#stretch goal
# @require_http_methods(["GET"])
# def list_users_groups(request):
#     pass
