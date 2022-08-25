from django.shortcuts import render
from django.views.decorators.http import require_http_methods

# Create your views here.

# import djwto.authentication as auth

# @auth.jwt_login_required
# def get_some_data(request):
#     token_data = request.payload
#     # do stuff
#     return response

@require_http_methods(["GET"])
def list_users_events(request):
    pass

@require_http_methods(["GET"])
def list_user_detail(request):
    pass

@require_http_methods(["GET"])
def list_users_activities(request):
    pass

#stretch goal
@require_http_methods(["GET"])
def list_users_groups(request):
    pass
