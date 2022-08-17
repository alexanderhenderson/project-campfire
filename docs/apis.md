In the apis.md file, you will list each of the RESTful endpoints that you think you'll need to power your application.


# APIs

# 
Then, for each human-readable interaction type, you'll make that a second-level heading. You'll include the HTTP method, the path, the expected parameters, and the return values. Then, you will give an explanation of what the API function should do.

From the Conference GO application, you might see something like this.

## Create a new location

* **Method**: `POST`
* **Path**: /api/locations

Input:

```json
{
  "name": string,
  "city": string,
  "state": string
}
```

Output:

```json
{
  "id": int,
  "name": string,
  "city": string,
  "state": string,
  "picture_url": string
}
```

Creating a new location uses the incoming city and state
data to query an image API to get a URL for an image for
the location. Then, it saves the name, city, state, and
image URL to the database. It returns all of the data
with the new database id.