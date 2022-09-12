## Friday, September 2, 2022
Continued to work on the home page. Added the name of
our app into the header image. Working to add a call
to action button that links to the registration today.
Still trying to figure out what more to add to that
home page because I'm not sure I like the original idea.

## Thursday, September 1, 2022
Created events list page reusing the card component
that I used to create the main home page. Tweaked
the components to make them all look even and implemented
a search using stateful functions so that as you type, the
event cards filter and updated home page css again.

## Wednesday, August 31, 2022
Created card component for events. Was able to update 
event card columns to be maxed out at 3 for homepage
display using a slice function after playing around
with it for awhile. Also updated title and the header
photo was added to the main home page.

## Tuesday, August 30, 2022
Today we started divvying up the to do list a little more. James
and I figured out how we wanted to differ the home pages we were
building since I was doing the public facing one and he was doing
the internal users/members facing one. We were stuck on authorization
related things for awhile and are trying to see how we can connect
Django's login functionality with the react front end since there's
a bit of rerouting that needs to be done.


## Monday, August 29, 2022
Spent a lot of time debugging and trying to figure out why when we
merge we seem to always have problems like a container coming down.
Spent a lot of time fixing these errors and said we wouldn't delete
anymore migration files. Since there were missing files, it was
causing the containers to not run because one migration file depended
on another missing one.

## Wednesday, August 23, 2022
We spent a couple hours today debugging the model encoder that was
written for us awhile ago. We tried to do a manual makeshift way but
ultimately we wanted to fix it and get the elegant solution we were
looking for but wasn't able to figure out on our own. We spent a few
hours with Daniel and then Curtis jumped in. Today we learned about
the ManyRelatedManager object, the duck test and that functions can
actually call classes. Curtis helped us add a few lines to make our
encoder work. We then had to spend some time getting the main branch
current then called it a night.

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