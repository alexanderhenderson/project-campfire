## Fri, Sept 16, 2022
Fixed the update profile page by changing the ChangeHandler to setState on the input data without being an array and it worked properly. Spent the rest of the day doing API documentation stuff and cleaning up some final css, as well as fixing a couple deployment bugs. Learned that the URLfield in django (for our profile photo url) has a limit of 200 characters initially, we added a new limit to our model that was much higher.

## Thurs, Sept 15, 2022
Did a bunch of css front end work, and also made a whole new page that allows you to edit the user profile using a PUT request and an onsubmit, currently working through a weird bug where whenever we submit the pertinent information in the forms, it injects that same information into the URL ... weird

## Wed, Sept 14, 2022
Added a drop down menu to the the User profile page for the friends list, and also the activities list, then proceeded to rewrite the get request for the user profile page using the useParams hook, so you could travel to other user profile pages.Created a useContext file, Changed the app page to make a call for the user token, and store that info in the UseContext file, so that we can access it throughout the entire app.

## Tues, Sept 13, 2022
Added an activities list pop up on the activities page, so current user could view the current favorite activites, updates automatically. Updated the User Profile to render dynamically with attached token to the current user, and also added a column for the current events that the user is attending using spicy(read "simple") logic. Added the pictures of the events onto the user profile and just generally spruced up the profile page.

## Mon, Sept 12, 2022
added a test to the events microservice, testing for the activities list, added and worked on some css to make the activities page and events page more cohesive.

## Friday Sept 9 2022
added functionality to Events page, fixed the add attendees button to disapear when clicked and user is in the list.

## Thursday, Sept 8, 2022
Helped alex with Matching algo, and added clickable events that lead to specific event detail.

## Wednesday, Sept 7, 2022
Added the add attendees component to the events detail page, had to rewrite the put request in the events.views in order to get it to accept the M2M relationship, referenced Tim's users views in order to do this but had to make some adjustments. Page also re-renders using the use-effect, based on attendeeslist changing. Upon click, Attendees list renders in the html underneath. 
## Tuesday, Sept 6, 2022
Finalized the add an activity page to have a working onClick on card, that sends the Activity to the particular users Favorite Activity List, had a great time figuring out how to get the activities to disapear on selection via some creative logic, added some css so that the mouse cursor changes on hover, also made it so that the page rerenders every time the activities list changes via the useEffect(listener?) proud of this implementation!
## Friday, Sept 2, 2022
Didn't have much time to work today, we got held up trying to extract the info from the token and then the mandatory fun event got in the way of really trying to work on our projects.

## Thursday, Sept 1, 2022
Kept on adding front-end components almost finished up the activities selection page.

## Wednesday, August 31, 2022
Alex pretty much fixed up the Auth stuff today, 
I got a nav bar hooked up in react so we could link all of our pages up, kept building on front end implementations and components. 

## Tuesday, August 30, 2022
Started working on frontend stuff, while Alex figures out Auth stuff. 
Joyce and I got a few front pages working with react hooks.

## Monday, August 29, 2022
Finished backend last week so started to work on Front end stuff, had some hangups with Auth stuff and needed to get help from Andrew, finally worked it out, auth is almost finished.

## Friday, August 26, 2022
Pair programmed with Tim to get the Users backend completely up to snuff, got the insomnia responding for each request we wanted to create views for. Joyce and Alex worked on getting the Events backend finished.

## Thursday, August 25, 2022
Had our first stand up, continued to work on views on users and events, Austin continued to work on google API stuff.
## Wednesday, August 24, 2022
Continued to build out views/models and got stuck on a M2M encoder Error (many related manager not json serializeable) for the entire day, eventually had curtis come in to help us after many hours and he created a super encoder to fix and serialize the data coming in from our views. 
## Tuesday, August 23, 2022
Started to build and design models for the events and users microservices
changed designs again after some deliberating, finally got some solid UBIQUITOUS language going and got a real understanding as to what the intention of the webapp was. Created some User stories, to simulate what kind of views we would need to create. 
## Monday, August 22, 2022
Changed our project idea after some thought,
spent the day working on design and getting together a MVP idea
worked on getting the microservices and docker compose configured. 

## Friday, August 19, 2022
we helped eachother get the docker compose up and running today. Using the learn commands and some team work, we got all 4 of our microservices up and running properly. Learning to integrate our git merges is going to be interesting. We also added some more to our Excalidraw, building on our projects design.
