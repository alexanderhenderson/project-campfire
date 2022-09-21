from django.views.decorators.http import require_http_methods
from .models import User, ActivityVO, Comment
from django.http import JsonResponse
import json
from common.json import ModelEncoder
import djwto.authentication as auth


# Create your views here.


@auth.jwt_login_required
@require_http_methods(["GET"])
def api_user_token(request):

    if "jwt_access_token" in request.COOKIES:
        token = request.COOKIES["jwt_access_token"]
        if token:
            return JsonResponse({"token": token})
    response = JsonResponse({"token": None})
    return response


class UserListEncoder(ModelEncoder):
    model = User
    properties = [
    "id", "username", "first_name", "last_name",
    "email", "profile_photo", "city", "state"
    ]


# path: http://localhost:8080/users/api/tokens/user/
@auth.jwt_login_required
@require_http_methods(["GET"])
def api_user_info(request):

    # most of the error handling is in the @auth header, an invalid
    # or manipulated token will be rejected by djwto, so we
    # just need to worry about returning the correct information,

    if "jwt_access_token" in request.COOKIES:

        # storing payload decoded by DJWTO
        token_data = request.payload

        # getting user instance stored in token
        user_id = token_data["user"]["id"]
        user = User.objects.get(id=user_id)

        # JSON Response
        if token_data:
            return JsonResponse(user, encoder=UserDetailEncoder, safe=False)

    response = JsonResponse({"token": None})
    return response


# path: http://localhost:8080/users/
@auth.jwt_login_required
@require_http_methods(["GET"])
def api_friend_kindler(request):

    if "jwt_access_token" in request.COOKIES:

        # storing payload decoded by DJWTO
        token_data = request.payload

        # our goal is to return a list of users. To do this we will compare the
        # activities of user from the frontend with the activities of all the
        # other users. The 10 users with the most similar activities (checked
        # by comparing sets of activity ids) will be returned to be listed in
        # the front end kindle page. Currently, this response includes users
        # that are already frineds of the client user - which ideally would not
        # be the case
        user_id = token_data["user"]["id"]
        user = User.objects.get(id=user_id)

        # getting user's favorite activities and storing their
        # ids in a set for comparison later
        user_activities = user.favorite_activities.all()
        user_activity_setlist = set()
        for activity in user_activities:
            user_activity_setlist.add(activity.id)

        # getting all existing friends
        friends = user.friends.all()

        # getting all of the users excluding the client
        # using the friend set, we will also exclude
        # existing friends
        users = User.objects.exclude(id=user_id)
        users = set(users).difference(set(friends))

        # setting initial empty dict
        resultsV2 = {}

        # going through all users. Our goal is to get a dataset containing
        # all of our users and the number of activities they have in common
        # with the client user
        for compared_user in users:

            # creating activity set to compare with client user's set
            compare_set = set()
            for activity in compared_user.favorite_activities.all():
                compare_set.add(activity.id)

            # comparing the sets of activity ids, and counting the number of
            # common activity (ids)
            common_activities = user_activity_setlist.intersection(
                compare_set
            )
            number_common_activities = len(common_activities)

            # checking if they have at least 1 activity in common
            if number_common_activities > 0:

                # the dictionary key is the number of activities in common,
                # the value is a list of user ids of users with that number
                # of activities in common with the client. If a key doesn't
                # exist we create one, or we add the user id to the
                # existing value if the key does exist.
                if number_common_activities in resultsV2:
                    resultsV2[number_common_activities].append(
                        compared_user.id
                    )
                else:
                    resultsV2[number_common_activities] = [compared_user.id]

        # to begin accessing the results dictionary, we need to know where to
        # start. The maximum number of matched activities is the total number
        # of activities in the database, so the key we will start with is
        # equal to the number of activity entries in the database.
        num_activities = len(ActivityVO.objects.all())

        # we go from the starting key down to zero and stop there. We are
        # looking
        # for 9 user IDs, less than that is fine if the database only has
        # 9 users
        # with an activity selected. The results list will be a list of 9
        # or fewer
        # user IDs which are who we have matched with the client user.
        results_list = []
        done = False
        for i in range(num_activities, 0, -1):
            if done is True:
                break
            if i in resultsV2:
                if done is True:
                    break
                if (len(results_list) + len(resultsV2[i])) <= 9:
                    results_list = results_list + resultsV2[i]
                else:
                    for res in resultsV2[i]:
                        if len(results_list) < 9:
                            results_list.append(res)
                        else:
                            done = True
                            break

        user_list = []
        for usr in results_list:
            user_list.append(User.objects.get(id=usr))

        # JSON Response
        if token_data:
            return JsonResponse(
                user_list, encoder=UserDetailEncoder, safe=False
            )

    response = JsonResponse({"token": None})
    return response


class ActivityVOEncoder(ModelEncoder):
    model = ActivityVO
    properties = ["id", "name"]


class FriendsEncoder(ModelEncoder):
    model = User

    properties = ["id", "username", "email", "profile_photo"]


class UserDetailEncoder(ModelEncoder):
    model = User
    properties = [
        "id",
        "username",
        "first_name",
        "last_name",
        "email",
        "profile_description",
        "profile_photo",
        "city",
        "state",
        "favorite_activities",
        "friends",
    ]
    encoders = {
        "favorite_activities": ActivityVOEncoder(),
        "friends": FriendsEncoder(),
    }


class UserCommentEncoder(ModelEncoder):
    model = User
    properties = [
        "id",
        "username",
        "first_name",
        "last_name",
    ]


class CommentEncoder(ModelEncoder):
    model = Comment
    properties = [
        "id",
        "comment",
        "commenter",
        "user_profile",
    ]
    encoders = {
        "commenter": UserCommentEncoder(),
        "user_profile": UserCommentEncoder(),
    }


# @auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def list_users(request):
    if request.method == "GET":
        users = User.objects.all()
        return JsonResponse({"users": users}, encoder=UserListEncoder)
    else:  # POST
        try:
            content = json.loads(request.body)
            raw_password = content["password"]
            del content["password"]
            user = User.objects.create(**content)
            user.set_password(raw_password)
            user.save()
            return JsonResponse({"user": user}, encoder=UserDetailEncoder)
        except User.DoesNotExist:
            response = JsonResponse({"message": "something went wrong"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def user_detail(request, pk):
    if request.method == "GET":
        try:
            user = User.objects.get(id=pk)
            return JsonResponse(user, encoder=UserDetailEncoder, safe=False)
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
    else:  # PUT
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
            props = [
                "username",
                "first_name",
                "last_name",
                "email",
                "profile_description",
                "profile_photo",
                "city",
                "state",
            ]
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
            {"ActivityVOs": activityVO}, encoder=ActivityVOEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            activityVO = ActivityVO.objects.create(**content)
            # print(activityVO)
            return JsonResponse(
                {"activityVO": activityVO}, encoder=ActivityVOEncoder
            )
        except ActivityVO.DoesNotExist:
            response = JsonResponse({"message": "something went wrong"})
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def activity_detail(request, pk):
    if request.method == "GET":
        try:
            activityVO = ActivityVO.objects.get(id=pk)
            return JsonResponse(
                activityVO, encoder=ActivityVOEncoder, safe=False
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
    else:  # PUT
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


# put request to add friend, at the moment this does not reject duplicate
# requests
@auth.jwt_login_required
@require_http_methods(["PUT"])
def api_friend_detail(request):

    try:
        if "jwt_access_token" in request.COOKIES:

            # get user id and friend id
            user_id = request.payload["user"]["id"]
            friend_id = json.loads(request.body)

            # get user and friend instances
            user = User.objects.get(id=user_id)
            friend = User.objects.get(id=friend_id)

            # add friend instance to user friends field
            user.friends.add(friend)

            # return a response
            response = JsonResponse({"message": "friend added"})
            response.status_code = 200
            return response
    except User.DoesNotExist:
        response = JsonResponse({"message": "failed to add friend"})
        response.status_code = 200
        return response


# @auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def list_comments(request):
    if request.method == "GET":
        comments = Comment.objects.all()
        return JsonResponse(
            {"comments": comments},
            encoder=CommentEncoder,
            safe=False,
        )
    if request.method == "POST":
        # token_data = request.payload
        # user_id = token_data["user"]["id"]
        content = json.loads(request.body)
        user_id = content["user_id"]
        content["commenter"] = User.objects.get(id=user_id)
        del content["user_id"]
        content["user_profile"] = User.objects.get(id=content["user_profile"])
        # How do we grab the user id of the profile we're on?
        comment = Comment.objects.create(**content)
        return JsonResponse(
            {"comment": comment},
            encoder=CommentEncoder,
            safe=False,
        )


# @auth.jwt_login_required
@require_http_methods(["GET", "PUT", "DELETE"])
def comment_detail(request, pk):
    if request.method == "GET":
        try:
            comment = Comment.objects.get(id=pk)
            return JsonResponse(
                {"Comment": comment},
                encoder=CommentEncoder,
                safe=False,
            )
        except Comment.DoesNotExist:
            return JsonResponse("Comment does not exist.", status=400)
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            comment = Comment.objects.get(id=pk)
            props = [
                "comment",
            ]
            for prop in props:
                if prop in content:
                    setattr(comment, prop, content[prop])
            comment.save()
        except Comment.DoesNotExist:
            return JsonResponse("Comment does not exist", status=400)
        return JsonResponse(
            {"Comment": comment},
            encoder=CommentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            Comment.objects.get(id=pk).delete()
            count, _ = Comment.objects.filter(id=pk).delete()
            return JsonResponse({"Deleted": count == 0})
        except Comment.DoesNotExist:
            return JsonResponse({"Error": "Comment does not exist"})


@require_http_methods(["GET"])
def get_users_profile_comments(request, pk):
    user = User.objects.get(id=pk)
    users_comments = user.comment_location.all()
    return JsonResponse(
        {"comments": users_comments},
        encoder=CommentEncoder,
        safe=False,
    )


# stretch goal
# @require_http_methods(["GET"])
# def list_users_groups(request):
#   pass
