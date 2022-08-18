# Data models

## Location
| Name | Type | Unique | Optional |
|-|-|-|-|
| city | string | no | no |
| state | reference to State entity | no | no |

## User

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | no | no |
| age | integer | no | yes |
| email | string | yes | no |
| picture_url | string | no | yes |
| location | instance | no | yes |
| activity | instance | no | yes |


## Group
| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | no | no |
| activity | instance | no | yes | foreign key to activity
| event | instance | no | yes |
| owner | instance | yes | no |


## Activity

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | yes | no |
| location | instance | no | no |
| user | instance | no | yes |


## Event

| Name | Type | Unique | Optional |
|-|-|-|-|
| name | string | yes | no |
| activity | instance | no | no |
| location | instance | no | no