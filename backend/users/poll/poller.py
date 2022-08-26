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

def get_activities():

    # print("We are in the polling function")
    response = requests.get("http://localhost:8090/events/activities/")

    content = json.loads(response.content)
    # print("Polled and received content: ", content)

    for activity in content["activities"]:
        ActivityVO.objects.update_or_create(
            name = activity['name']
        )


def poll():
    while True:
        print('User poller polling for data')
        try:
            # Write your polling logic, here
            get_activities()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
