from django.test import TestCase
import json
from .models import Event, Activity, UserVO

# Create your tests here.

class EventsApiTest(TestCase):
    def setUp(self):
      self.Event = Event.objects.create(
        id = 1
        name = 'Party'
        profile_description = 'profile description',
        city = 'san francisco'
        state = 'CA'
        date_joined =
      )

      self.friend = UserVO.object.create(
        id=2,
        username="TestUser",
        first_name="Test",
        last_name="User",
        email="testemail@gmail.com",
        profile_description="This is a description for the Test User mock data",
        profile_photo="https://woodfibreinsulation.co.uk/wp-content/uploads/2017/04/blank-profile-picture-973460-1-1-300x300.png",
        city="Kalamazoo",
        state="MI",
      )
    
      self.favorite_activities = Event.object.create(
        id = 1
        name = 'hiking'
      )
      
    
    def test_events_list(self):
      response = self.client.get('/events')
      content = response.json()
      self.assertEqual(response.status_code, 200)
      for event in content['events']:
          if event['name'] == self.event.name:
              self.assertEqual(event['id'], self.event.id)
    
    def test_uservos_list(self):
        pass
    
    def test_get_event(self):
        pass

    def test_show_event_details(self):
        pass
    
    def test_activities_list(self):
        pass

    