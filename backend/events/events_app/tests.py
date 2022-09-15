from django.test import TestCase
from .models import Event, Activity, UserVO
import json

# Create your tests here.


class EventsApiTest(TestCase):
    def setUp(self):

        self.owner = UserVO.objects.create(
            id=2,
            username="TestUser",
            first_name="Test",
            last_name="User",
            email="testemail@gmail.com",
        )

        self.activity = Activity.objects.create(
            id=1,
            name="hiking",
        )

        self.Event = Event.objects.create(
            id=1,
            name="Party",
            description="Party all day",
            activity=self.activity,
            start="2022-12-25T23:51:41+00:00",
            end="2022-12-25T23:51:41+00:00",
            latitude=1,
            longitude=1,
            picture_url="",
            owner=self.owner,
        )

        self.attendee = UserVO.objects.create(
            id=3,
            username="TestAttendeeUser",
            first_name="AttendeeName",
            last_name="AttendeeLastName",
            email="attendeeEmail@gmail.com",
        )

    def test_events_list(self):
        response = self.client.get("/events/")
        content = response.json()
        self.assertEqual(response.status_code, 200)
        for event in content["Events"]:
            if event["name"] == self.Event.name:
                self.assertEqual(event["id"], self.Event.id)

    def test_uservos_list(self):
        pass

    def test_get_event_detail(self):
        response = self.client.get("/events/1/")
        content = response.json()
        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(content["Event"]), 11)
        self.assertEqual(type(content["Event"]["id"]), int)
        self.assertEqual(content["Event"]["name"], "Party")
        self.assertEqual(content["Event"]["owner"]["id"], 2)

    def test_put_event_detail(self):

        data = json.dumps(
            {
                "name": "UpdatedParty",
                "description": "Updated Party all day",
                "start": "2022-02-25T23:51:41+00:00",
                "end": "2022-02-25T23:51:41+00:00",
                "latitude": 10,
                "longitude": 10,
                "picture_url": "updated.com",
            }
        )

        response = self.client.put(
            "/events/1/",
            data,
            content_type="application/json",
        )
        content = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content["name"], "UpdatedParty")

    def test_activities_list(self):
        response = self.client.get("/events/activities/")
        content = response.json()
        self.assertEqual(response.status_code, 200)
        for activity in content["Activities"]:
            if activity["name"] == self.activity.name:
                self.assertEqual(activity["id"], self.activity.id)

    def test_delete_event_detail(self):

        response = self.client.delete("/events/1/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Event.objects.all()), 0)
