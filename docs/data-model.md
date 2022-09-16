# Data models


## User

| Name | Type | Unique | Optional |
|-|-|-|-|
| username | string | yes | no |
| first_name | string | no | no |
| last_name | string | no | no |
| email | string | no | yes |
| profile_photo | url | no | yes |
| profile_description | string | no | yes |
| city | string | no | no |
| state | string | no | no |
| friends | list of references to User entities | no | yes |
| favorite_activities | list of references to ActivityVO entities | yes | no |

The `User` entity contains the data about a user that has signed up for the site.


## UserVO

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | integer | yes | no |
| username | string | yes | no |
| first_name | string | no | no |
| last_name | string | no | no |
| email | string | no | yes |

The `UserVO` entity contains the data for a related User entity in the users microservice


## Activity

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | integer | yes | no |
| name | string | no | no |
| picture_url | url | no | yes |

The `Activity` entity contains the data for activities that a user can set as their favorite activities or add the activity to an event. 


## ActivityVO

| Name | Type | Unique | Optional |
|-|-|-|-|
| id | integer | yes | no |
| name | string | no | no |

The `ActivityVO` entity contains the data for a related Activity entity in the events microservice.


## Event

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | no | no |
| description | string | no | yes |
| owner | reference to a UserVO entity | no | no |
| activity | reference to an Activity entity | no | no |
| start | date-time | no | no |
| end | date-time | no | no |
| latitude | float | no | no |
| longitude | float | no | no |
| attendees | list of references to UserVO entities | no | yes |
| picture_url | url | no | yes |

The `Event` entity contains the data for a user generated event that other users can click on to attend.


## Comment 

| Name | Type | Unique | Optional |
|-|-|-|-|
| comment | string | no | no |
| time_posted | date-time | no | no |
| commenter | reference to User entity | no | no |
| user_profile | reference to User entity | no | no |

The `Comment` entity contains the data for comments left on a user profile by users.