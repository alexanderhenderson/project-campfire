## Tuesday, August 23, 2022
Today we finished up the models for the events_app but we might alter
them again to add a members model which would have a foreign key to
events, groups and user. We looked through how to implement the Google
Map API since it's so rich with information. We decided what we wanted
out of the API then split off into two groups to work on that, the views
and the urls. For the urls, we wrote a view all events function and
everything shows except for the attendees manytomany field. We have worked
at it for a couple of hours with no luck so will try again tomorrow. We
were able to successfully find a decimal encoder for our long and lat
properties to our models which we implemented so that was a win.

## Monday, August 22, 2022
Our goals today as a team are to create the models, views and urls.
We also want to look more into the Google map API we intend to use.
We agreed that we could have our MVP within 2 weeks and save the 
groups and messenger as the stretch goal. MVP at this time are the users,
activities, location related items and all of front end.

## Friday, August 19, 2022
I created the react app and django project/app along with the docker
compose file so we could get the basic architecture of the project
set up. We also created the events, messenger and users projects/apps.
We spent a lot of time getting everything set up and the containers to
work properly. It was satisfying to be able get everything fully 
functioning before heading into the weekend.


## Wednesday, August 17, 2022

We decided to change our project to a new idea that we were excited about.
We felt it was important to work on something we actually liked. Since we
pivoted, I had to rewrite the readmes' and used excalidraw to remap
everything. I also fleshed out all the other readme's that we had to
complete before it was due and created some wireframes of each page we
would want a user to see. We discussed domain driven design concepts
and tried to figure out what would be the best way to do the features
we wanted to implement. We also divyied up the work and decided to work
in partners / groups.