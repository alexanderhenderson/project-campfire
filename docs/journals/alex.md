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

Wednesday 9/8
    It's been a long week.

    Cookies expires at 24 hours, we spend a moment trying to decide when to refresh them with a test
    in the authprovider declaration, but it wasn't working as expected (it only worked in a file
    that authprovider was imported in). For the moment we sidestepped the issue by setting the tokens
    to expire after 30 days. 

    Issues with state values not getting set before the page loads continued to plague us for a while.
    We abandoned the function I built and made an api endpoint in the users microservice that returns
    the user details for a currently logged in user (the user in the active token). This still had
    issues so James and I figured out how to use promise chains to set everything we need to set the
    state following a fetch request.

    I'm working on the friend finder / member matcher / kindler that helps users find other users in
    their area with similar interests. Goal is to have an api endpoint in Django that returns a list 
    of 10 users, sorted from best match to worst (with enough users, this would return a list of 10
    users who are decent matches). Currently we have no messenger so a user will just be able to 
    email another user to set something up - once our MVP is finished this will hopefully change. 

    
Wednesday 9/14
    It was another long week

    James and I worked on a few ways to bulletproof our fetch requests from the front end.
    In a few places we implemented promise chains that I had not used before, but the biggest
    savior was the .?  optional chaining operator that allows our JSX to use state before the
    state is loaded. This way if the state is undefined, it simply doesn't load it instead of
    throwing an error that breaks the page. We can combine that with the javascript || (or)
    operator so that things like pictures and text can render a default value.

    I learned that if you do not set your state correctly in react functions that your page
    will not re-render. I had been doing this but parts of my kindler page would not update
    (for instance, I had a Ternary that was checking if the state was true or false, however
    even when the state changed from false to true, the Ternary did not reflect the change 
    in state). This caused a bit of headache, but makes sense. The mistakes I had been making
    was 1) directly changing the state variable, instead of using the custom setState()
    function that we create when we intialize the state. The 2) way I messed it up was by
    making a direct copy of the state, changing that and using that in the custom setState()
    functon. Since it was a linked copy, the setState() function didn't register that the
    state had changed at all, which means it didn't trigger a re-render of the page. 

    I created our programs "Kindler" page that allows users to find other users with similar
    interests and allows them to add them as a friend. The front end sends a request to the 
    back end, and the back end returns a list of users. The list was generated by getting a
    list of all the users, removing users that were already friend with the client side user
    making the request, and then essentially sorting the list of remaining by the number of
    activities that both they and the client user liked. The 9 users with the most similar
    activities are sent to the front end.

    Originally I had a list of 10 users, and the "top" match was featured on the Kindler page,
    as a large div above the other 9 matches. However, it really dominated the screen 
    (especially if the user photo was tall or was a close up picture of someone's face)
    so I decided to remove the featured match and return 9 users with the same size
    <divs>. 

    I also originally wanted to have the page allow you to set a maximum distance between
    yourself and other users, however some of our google API implementation took a while
    so it didn't get finished in time. The idea was to take the lat and longitude stored in
    the user to compare distances between users before matching. This way, you could set a
    maximum distance (as the crow flies at least) between yourself and other users so that
    you are not matched with a user across the country (the idea of the Kindler, and our
    app is general, is to meet people to meet in real life to hike/fish/do outdoor 
    activities not just talk with online)

    I now understand how to add context to a react component however I don't feel
    I have enough time to implement something before friday. Currently each page makes a
    request to the back end for the client's user ID and username, ideally we would not
    do that and could store the user name and id after the user logs in the first time, and
    then store that in a high level component's context (like the authcontext). I want to
    do this as a stretch goal.

    Yesterday we almost made a big discovery with the djwto tokens. Djwto will not
    recognize a token created in another microservice (we were creating the token
    in the Users Django microservice, and then trying to use them in the Events
    microservice). There does not seem to be an easy way to fix this - djwto's
    documentation is fairly lean and there is very very little information outside
    of that (youtube, stackoverflow, etc). This also effected the pollers, so the events
    poller could not retrieve data from the users microservice once all of those view
    functions were protected.

        We were aware that our Django unit tests would need some work to work with Djwto.
        For the moment that isn't an issue, however I want to try to create a unit test
        that can test the djwto authentication by logging itself in and attempting to
        retreive a token (and potentially hit the other api endpoints that are protected).
    
        After talking with seers yesterday, I decided to not protect all of the views.
        One of my stretch goals with this project now is to refactor the authentication
        to user a dwt service other than Djwto as I found that part of the project very
        interesting, but struggled with the very limited documentation offered by djwto.
        I undertand that leaving the views unprotected in production is very bad practice,
        so that is probably the first thing I will be working on once the project is 
        completed. 

        Today we also had a problem with Djwto during deployment. We set the DJWTO_SAME_SITE
        setting to None. It was previously set to "Lax if dev==False else None" (or somthing
        to that effect) and it was causing our fetch requests from the front end to fail. 

    Today I am working on a few unit tests, including one to test the token authentication.
        The tests I created (in Events microservice):
            test_get_event_detail
            test_put_event_detail
            test_delete_event_detail
        Test I am working on in the Users microservice:
            test_djwto
    
FINAL JOURNAL 9/16:
    Yesterday eneded fairly well, everything but deployment was working. After finishing unit
    tests I just worked on CSS on the pages I made. 

    Today was mostly the same. Fixed a bug with the logout link in the nav bar where it didn't
    update after you logged out (so the log out link was still there).

    Did some more CSS stuff, tidying up pages, added backgrounds to login. 

    And now I am done. Woot.

