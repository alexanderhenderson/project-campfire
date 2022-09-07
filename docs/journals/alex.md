Running to do list:
    Research:
        Material UI
        Rabbit MQ or equivalent


Friday 8/19:

Altered excalidraw to reflect the new project
    including Model fields and connections

things to go over:
Naming convention for dev-branches
naming convention for django apps
finalize css framework
    - material ui
    - bootstrap
how our django apps will communicate with eachother


Monday 8/22:

Decided groups and messenger service are both stretch goals
Added weekly notes to excalidraw
Need to research:
    Material UI CSS Framework
    Queries

Tuesday 8/23
    Looking into abstractuser model for user model
    look up "verbose name"
    Working on the Django view functions for the api endpoints. I Strugged with the ManyRelatedManager 
    object in the queryset, instead getting the queryset to work with the encoders I manually created 
    a json formatted dictionary by using the .values() method on the queryset.
        The manyrelatedmanager comes out of the ManytoMany field in the model and apparently acts as
        a function - hence the encoders can't deal with it. But I figured out how to access the queryset
        inside of it manually and combined that with the main queryset.
    Our group is certain there is a better way to do this, but we are not sure how to alter the encoder
    to work with the function.

Wed 8/24
    After spending a lot of time with Siers/Daniel, Curtis eventually jumped in and created a modification
    in the common file json encoders to test for and change the manyrealtedmanager into a queryset - and
    then pass the queryset on to get encoded in the jason response. 

Thurs 8/25
    Today way good, everything is going well. James/Tim worked finished the abstract User model, apparently
    it had reserved field names in the abstractuser model that we were inheriting from and removing the 
    reserved field names in our user model fixed the issue. 
    Joyce and I pair programmed view functions in the Events model and got most of them working - the only
    one we haven't figured out is returung events that contain a particular attendee/user. We will continue
    work on that.

Friday 8/26 - Had 1 hr meeting outside of regular class hours
    Personal Notes
        I created a poller in the Users microservice to poll data from the Events microservice. It currently only
        pulls from the Activity model into the ActivityVO model in the users microservice. 

        Tim merged all of the users stuff into main and I pulled that into my dev file which cused some issues
            - our team has been struggling with migrations causing containers to crash. We might consider adding them
            to git ignore as our Dockerfiles run an initial migration when they first start anyways. 

    Friday Night Google Meeting Notes:

    - Poller for User Microservice is completed and functional, Alex will merge it into Main tonight
        - Currently only polls for Activity names → ActivityVO
        - If you are working on the User Microservice Models you may need to update the poller
    - Tim has merged the User Models and Views into main, everything looks good
        - Events microservice UserVO model needs to be updated to reflect what is in the User Models
    - Tim also created an insomnia json file you can import to have all of the insomnia requests for testing/whatever

Monday 8/29
    Solved a lot of merge issues today, fixed the pollers so that the data in our VO objects uses the same ID assigned
    to it's origin in the database. Pollers are essentially finished, aside from any future data that we want to poll
    that can be fairly easily added to the polling call.

Tuesday 8/30
    Morning:
        Setting up login/logout functionality to the Django users Microservice. I've added templates and want to also add
    Bootstrap to them, but that might have to wait as it is not a core functionality. Currently I have the login/out
    working, and it redirects to our React main page after login. Next is working on the authentication tokens so
    that other django apps and React know if a user is logged in/out. 
    Afternoon:
        Looks like we can do this through the react front end. We are working on the JWT and authorization and having issues

Wednesday 8/31
        It's been a long day, I got the Jason Web Tokens working with the authorization functions they give us. The backend is also
    working, validating and sending the token back to the frontend. I made a login form, got it working and then have a simple
    logout form with a single button. Next I want to make a sign up form to test functionality. Once everyone gets a chance to
    integrate the authorization in their front end pages we will begin to get the back end completely protected with the
    jwt_login_required decorators. 

Thursday 9/1
    We had some issues with the logout functionality, which comes down to our browsers storing 
    expired tokens. We need to figure out how to refresh tokens. 

    I added a getUserInfo() function to the authorization file that can be imported from anywhere, 
    and will let us get the username and id with a simple function call. It returns a dictionary 
    like so {"username": -username-, "id": -id-}. The key to this is a jwt decoder I found online 
    that I'd like to explore, it is also in the authorization.js file, right above the 
    getUserInfo function. This might be best to store in a prop but for now we will just use the
    function to call for the user id and name when we need it. 

    Store username and id in auth context

    


