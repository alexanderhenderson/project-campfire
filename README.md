# Group 666: Campfire

## Design

* [API design](docs/apis.md)
* [Data model](docs/data-model.md)
* [GHI](docs/ghi.md)
* [Integrations](docs/integrations.md)

* Joyce Lum
* Austin Miller
* Alexander Henderson
* Timothy Lotz
* James Egan


## Intended market

The intended market for this app are people who enjoy outdoor recreational activities
and are looking to meet similar minded people.


## Functionality

* Registration / login / logout
* Matching / recommendations based on similar interests
* Favorite activities preferences page (to see recommendations)
* User profile with about me, favorite activities, etc
* Events page (upcoming events)
* Home / landing page

## Installation Instructions

### Online Usage

    - visit https://66617.gitlab.io/project-gamma/

### Local Installation

    - clone the repository
    - open your terminal and run the following commands
        - cd into the root file
        - docker volume create postgres-data
        - docker-compose build
        - docker-compose up
    - visit http://localhost:3000/
