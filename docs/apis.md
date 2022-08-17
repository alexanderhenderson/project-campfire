# APIs

## Get users

* **Method**: `GET`
* **Path**: /api/users


Output:

```json
{
  "name": string,
  "age": integer,
  "email": email,
  "picture_url": url,
  "location": object
}
```


## Create user

* **Method**: `POST`
* **Path**: /api/users

Input:

```json
{
  "name": string,
  "age": integer,
  "email": email,
  "picture_url": url,
  "location": object
}
```

## Get groups

* **Method**: `GET`
* **Path**: /api/groups


Output:

```json
{
  "name": string,
  "activity": object,
  "event": object
}
```


## Create group

* **Method**: `POST`
* **Path**: /api/groups

Input:

```json
{
  "name": string,
  "activity": object,
  "event": object
}
```


Output:

```json
{
  "name": string,
  "activity": object,
  "event": object
}
```

* We'll also be doing this same format for all the models along with
the detail views, updating or deleting them but for the sake of time
we are skipping the rest