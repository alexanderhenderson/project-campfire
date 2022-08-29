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
    Queires

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
