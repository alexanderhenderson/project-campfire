# APIs
========================================
## (USERS)
========================================
## Get User Detail

* **Method**: `GET`
* **Path**: /api/users/:id

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
========================================

## Get Users All (List)

* **Method**: `GET`
* **Path**: /api/users/

Input: `None`

Output:

```json
{
	"users": array
}
```
This request gets all of the users currently in the database
========================================

## Update User

* **Method**: `PUT`
* **Path**: /api/users/:id

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
========================================

## Create User

* **Method**: `POST`
* **Path**: /api/user

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
========================================

## Delete User

* **Method**: `DEL`
* **Path**: /api/user

Input: `None`

Output: `None`

This request deletes user associated with the id input in the URL
========================================

* We'll also be doing this same format for all the models along with
the detail views, updating or deleting them but for the sake of time
we are skipping the rest