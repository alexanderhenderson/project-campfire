## August 22, 2022

Today me and joyce worked on switching the databases used to postgres instead of sqlite databases. We ran into issues with the django containers connecting to the postgres container. We eventually found out, with the aid of Alex, Daniel and Andrew, that the create_multiple_databases.sh was not correctly creating the multiple databases by going into the postgres container and running the \l command to list the databases. These did not match the number or names we expected. Looking at the command prompt for the postgres container led to the error bin/bash^M file location not found when the container was attempting to run the create_multiple_databases.sh file. We fixed this on my machine by changing the end of line sequence from CRLF to LF. After I pushed the changed to main and Joyce pulled them we found out the issue was persisting on her machine...

The ah-ha of the day was figuring out that the bash file was not running because of the end of line sequence was set to CRLF instead of LF.

## August 19, 2022

Today we worked on setting up the project together in main

We started by creating a docker-compose.yml file and building the postgres and react containers in it.
We then created 3 different containers: events, messenger, and users and made a django project and app in each of the three containers and connected them to the database container.
we also worked on drawing out out models for when we code the models and views on monday.

The ah-ha moment of the day was gaining a greater understanding of setting up the volumes and databases within the docker-compose.yml.


