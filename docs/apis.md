# APIs

## (USERS Microservice)

## User Detail

* **Method**: `GET`
* **Path**: /users/:id/

Input: `None`

Output:

```json
{
	"id": int,
	"username": string,
	"first_name": string,
	"last_name": string,
	"email": string,
	"profile_description": string,
	"profile_photo": string,
	"city": string,
	"state": string,
	"favorite_activities": array,
	"friends": array,
}
```
This request gets the user/detail at the given id in the URL

----------------------------------

## List All Users

* **Method**: `GET`
* **Path**: /users/

Input: `None`

Output:

```json
{
	"users": array
}
```
This request gets all of the users currently in the database

----------------------------------

## Update User

* **Method**: `PUT`
* **Path**: /users/:id/

Input: `Which ever fields you want to update in user`

```json
{"any available field in user": data you chose to update}
```

Output: 

```json
{
	"id": int,
	"username": string,
	"first_name": string,
	"last_name": string,
	"email": string,
	"profile_description": string,
	"profile_photo": string,
	"city": string,
	"state": string,
	"favorite_activities": array,
	"friends": array,
}
```
This request allows you update any current field that's in the user model
based on the url input id. It returns the updated user and all of the current
fields that user has.

----------------------------------

## Create User

* **Method**: `POST`
* **Path**: /user/

Input:

```json
{
	"username": string,
	"first_name": string,
	"last_name": string,
	"email": string,
	"profile_description": string,
	"profile_photo": string,
	"city": string,
	"state": string,
}
```

Output:

```json
{
 "id": int,
	"username": string,
	"first_name": string,
	"last_name": string,
	"email": string,
	"profile_description": string,
	"profile_photo": string,
	"city": string,
	"state": string,
	"favorite_activities": array,
	"friends": array,
}
```
This request creates a new user, and returns the user after creation
with the id associated with the user, along with any mandatory fields,
or added fields.

----------------------------------

## Delete User

* **Method**: `DEL`
* **Path**: /user/

Input: `None`

Output: `None`

This request deletes user associated with the id input in the URL

----------------------------------

## (ActivityVO's)

## List all activityVO's

* **Method**: `GET`
* **Path**:/users/activities/

Input: `None`

Output:

```json
{
	"ActivityVOs": [
    {
      "id": int,
			"name": string,
    }
  ]
}
```
This request gets list of all the activityVO's in the database

----------------------------------


## Delete ActivityVO

* **Method**: `DEL`
* **Path**: /users/activities/:id/

Input: `None`

Output: `None`

This request deletes activity associated with the id input in the URL

----------------------------------


## Create ActivityVO

* **Method**: `POST`
* **Path**: /users/activities/

Input: 
```json
{
	"ActivityVOs": [
    {
			"name": string,
    }
  ]
}
```

Output: 
```json
{
	"ActivityVOs": [
    {
      "id": int,
			"name": string,
    }
  ]
}
```

This request takes in a name of an activity and creates a result that 
has the name of the activity and generates an id for it.

----------------------------------

## (EVENTS Microservice)

## (UserVO's)

## List All User's Events

* **Method**: `GET`
* **Path**: events/users/:id/

Input: `None`

Output:

```json
{
  "User's Events": []
}
```
This request gets events that the user has RSVP'd to.

----------------------------------

## (Activity)

## Delete activity

* **Method**: `DEL`
* **Path**: events/activit/:id/

Input: `None`

Output:

```json
{
  "Deleted": boolean,
}
```
This request deletes activity at id in url input

----------------------------------

## Update Activity

* **Method**: `PUT`
* **Path**: /events/activity/:id/

Input: `None`

```json
{"any available field in activity": data you chose to update}
```

Output: 

```json
{
	"Activity": {
		"id": int,
		"name": string,
		"picture_url": url string,
	}
}
```
This request allows you update any current field that's in the activity model
based on the url input id. It returns the updated activity and all of the current
fields that activity has.

----------------------------------

## Activity Detail

* **Method**: `GET`
* **Path**: /events/activity/:id/

Input: `None`

Output:

```json
{
	"Activity": {
		"id": int,
		"name": string,
		"picture_url": url string,
	}
}
```
This request gets the Activity/detail at the given id in the URL

----------------------------------

## Create Activity

* **Method**: `POST`
* **Path**: events/activities/

Input:

```json
{
		"name": string,
		"picture_url":string url,
}
```

Output:

```json
{
	"Activities": {
		"id": int,
		"name": string,
		"picture_url": string url,
	}
}
```
This request creates a new activity, and returns the activity after creation
with the id, along with any mandatory fields, or added fields.

----------------------------------

## List All Activites

* **Method**: `GET`
* **Path**: /events/activities/

Input: `None`

Output:

```json
{
"Activities": []
}
```
This request gets a list of all the Activities currently in the database

----------------------------------

## (Events's)

## Delete Event

* **Method**: `DEL`
* **Path**: events/:id/

Input: `None`

Output:

```json

{
	"Deleted": true
}

```
This request deletes Event at id in url input

----------------------------------

## Update Event

* **Method**: `PUT`
* **Path**: /events/:id/

Input: `Which ever fields you want to update in Event`

```json
{"any available field in Event": data you chose to update}
```

Output: 

```json
{
	"Event": {
		"id": int,
		"name": string,
		"latitude": string number,
		"longitude": string number,
		"start": string formatted date,
		"end": string formatted date,
		"description": string,
		"owner": {
			"id": int,
			"username": string,
			"first_name": string,
			"last_name": string,
			"email": string formatted email,
		},
		"activity": {
			"id": int,
			"name": string,
			"picture_url": string formatted url
		},
		"attendees": [
			{
				"id": int,
				"username": string,
				"first_name": string,
				"last_name": string,
				"email": string,
			}
		],
		"picture_url": string formatted url
	}
}
```
This request allows you update any current field that's in the Event model
based on the url input id. It returns the updated Event and all of the current
fields that Event has.

----------------------------------

## Create Event

* **Method**: `POST`
* **Path**: /events/

Input:

```json
{
	{
		"name": string,
		"latitude": string number,
		"longitude": string number,
		"start": string formatted date,
		"end": string formatted date,
		"description": string,
		"owner": int,
		"activity": int,
		"picture_url": string formatted url,
}
}
```

Output:

```json
{
	"Event": {
		"id": int,
		"name": string,
		"latitude": string number,
		"longitude": string number,
		"start": string formatted date,
		"end": string formatted date,
		"description": string,
		"owner": {
			"id": int,
			"username": string,
			"first_name": string,
			"last_name": string,
			"email": string formatted email,
		},
		"activity": {
			"id": int,
			"name": string,
			"picture_url": string formatted url
		},
		"attendees": [
			{
				"id": int,
				"username": string,
				"first_name": string,
				"last_name": string,
				"email": string,
			}
		],
		"picture_url": string formatted url
	}
}
```
This request creates a new Event, and returns the Event after creation
with the id, along with any mandatory fields on the model.

----------------------------------

## List all Events

* **Method**: `GET`
* **Path**: /events/

Input: `None`

Output:

```json
{
	"events": array
}
```
This request gets all of the events currently in the database

----------------------------------
