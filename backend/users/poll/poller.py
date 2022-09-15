import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "users_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something

# the below import works once the program is running
from users_app.models import ActivityVO

EVENTS_API = os.environ["EVENTS_API"]


def get_activities():

    response = requests.get(f"{EVENTS_API}/events/activities/")
    content = json.loads(response.content)

    for activity in content["Activities"]:
        ActivityVO.objects.update_or_create(
            id=activity["id"], defaults={"name": activity["name"]}
        )


def poll():
    while True:
        try:
            get_activities()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
