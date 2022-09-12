import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "events_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something

# the below import works once the program is running
from events_app.models import UserVO


def get_users():

    # print("We are in the polling function")
    response = requests.get("http://users:8000/users/")
    content = json.loads(response.content)
    # print("Polled and received content: ", content)

    for user in content["users"]:
        # print("user: ", user)
        UserVO.objects.update_or_create(
            id=user["id"],
            defaults={
                "username": user["username"],
                "email": user["email"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
            },
        )


def poll():
    while True:
        # print('User poller active - polling')
        try:
            get_users()
            # print('get user function used')
        except Exception as e:
            print(e, file=sys.stderr)
            print("get user function failed")
        time.sleep(60)


if __name__ == "__main__":
    poll()
