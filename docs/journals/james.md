


## Tuesday, August 23, 2022

worked out some design stuff on models as a group
started building some views, linked up a url path to the events view and got a list_all_events view to work with an empty list. When populating the list with dummy data via the admin, we got an error on decimals (Lat and long field from models) not being serializable (encoder). We added a decimal encoder to the encoders and then the error went away. We got stuck on an error on serializing "Object Type manyRelatedManager not Json Serializable", we've been trying to build a serializer/encoder that would allow this type of data, but haven't 
figured it out yet.

## Monday, August 22, 2022

Got hung up on a strange database issue all day.
pretty much lost the entire day to bug chasing.
need to implement - die docker die

## Friday, August 19, 2022
we helped eachother get the docker compose up and running today. Using the learn commands and some team work, we got all 4 of our microservices up and running properly. Learning to integrate our git merges is going to be interesting. We also added some more to our Excalidraw, building on our projects design.
