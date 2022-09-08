from django.test import TestCase
import json
from .models import ActivityVO, User


# Create your tests here.
class UsersApiTest(TestCase):
    def setUp(self):
        self.activity = ActivityVO.objects.create(
            name="Test Activity",
            id=1
        )
        self.friend = User.objects.create(
            id=3,
            username="TestFriend",
            first_name="Test",
            last_name="friend",
            email="testfriendemail@gmail.com",
            profile_description="This is a description",
            profile_photo="",
            city="Kalamazoo",
            state="MI",
        )
        self.user = User.objects.create(
            id=2,
            username="TestUser",
            first_name="Test",
            last_name="User",
            email="testemail@gmail.com",
            profile_description="This is a description",
            profile_photo="",
            city="Kalamazoo",
            state="MI",
        )

    def test_list_users(self):
        response = self.client.get("/users/")
        content = response.json()
        self.assertEqual(response.status_code, 200)
        for user in content["users"]:
            if user["username"] == self.user.username:
                self.assertEqual(user["id"], self.user.id)
            elif user["username"] == self.friend.username:
                self.assertEqual(user["id"], self.friend.id)

    def test_create_user(self):
        data = json.dumps(
            {
                "id": 1,
                "username": "TestCreate",
                "password": "testpassword",
                "first_name": "Test",
                "last_name": "Create",
                "email": "thisisatest@gmail.com",
                "profile_description": "this is a test for creatine a user",
                "profile_photo": "",
                "city": "Kalamazoo",
                "state": "MI"
            }
        )
        response = self.client.post(
            "/users/",
            data,
            content_type="application/json",
        )
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data["user"]["id"])

    def test_get_user_details(self):
        response = self.client.get("/users/2/")
        content = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content["id"], self.user.id)

    def test_update_friends_and_activity_lists(self):
        data = json.dumps(
            {
                "favorite_activities": [1],
                "friends": [3]
            }
        )
        response = self.client.put(
            "/users/2/",
            data,
            content_type="application/json",
        )
        data = response.json()
        self.assertEqual(response.status_code, 200)
        for activity in data["favorite_activities"]:
            if activity["name"] == self.activity.name:
                self.assertEqual(activity["name"], self.activity.name)
        for friend in data["friends"]:
            self.assertEqual(friend["username"], self.friend.username)

    def test_list_ActivityVO(self):
        response = self.client.get("/users/activities/")
        content = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content["ActivityVOs"][0]["id"], self.activity.id)
