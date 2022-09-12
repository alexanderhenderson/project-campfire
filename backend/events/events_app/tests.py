from django.test import TestCase
from .models import Event, Activity, UserVO

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

    def test_events_list(self):
        response = self.client.get("/events/")
        content = response.json()
        self.assertEqual(response.status_code, 200)
        print(content)
        for event in content["Events"]:
            if event["name"] == self.Event.name:
                self.assertEqual(event["id"], self.Event.id)

    def test_uservos_list(self):
        pass

    def test_get_event(self):
        pass

    def test_show_event_details(self):
        pass

    def test_activities_list(self):
        pass
