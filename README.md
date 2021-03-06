# My Practice App

My practice app is a web application that creates a practice schedule for a specified field of interest. Currently there is only support for learning guitar. Upon opening the app, cards 
with different tasks are displayed with data from the database. 

## Architecture

The backend is being built using a framework called Django. We chose to use React for our frontend. 

## Quickstart Guide

Before use, make sure you install the following

1) pip install django (make sure you have python installed)
2) check SQL configuration in intellij
3) install yarn https://classic.yarnpkg.com/en/docs/cli/install/

Go into the directory root/mypractice

4) Run "python manage.py runserver" to start the Django server
5) Open a new terminal window and navigate to root/mypractice/card-frontend
6) Once inside the directory type "yarn start"

You should then see our web app in action! 

***Login Info***
- Name: Admin
- Username: admin
- Password: admin


## Iteration 1 Summary

1) Created models for django database
2) Created the frontend that renders cards with data pulled from the database
3) Everyone is learning React and Django!

## Iteration 2 Summary

1) Added animation to home page
2) Added temp "admin" user to simulate a "login"
3) Added a "course list" component that displays a list of all available courses (currently only Guitar)
4) After selecting a course, a skill selection page is rendered. The user can select the skills they want to work on.
5) Added backend routes for /courses and /skills to send data to frontend
6) Added styling to CSS files for various componnents

## Iteration 3 Summary

In order to use material-ui you need to run the following commands:

yarn add @material-ui/core

yarn add @material-ui/icons

pip install django-rest-auth

1) Added styling to the Login Page (Reformatted using material-ui)
2) Converted the Card, Card List Course, CourseList and Deck Components into material ui components
3) Added global material-ui themes
3) Added login authentication 
4) Completed the backend for the complete button cards
5) Added a favorite button for cards
6) Started functionality for an opening and closing sidebar

## Iteration 4 Summary 

https://disco-moose.herokuapp.com/

1) Utilized local storage
  - to create login persistance 
  - to make page refresh re-render the component currently displayed without loging you out 
2) Added user registration functionality
3) Added a functional sidebar with a button for loging out
4) Added logout functionality
5) Added a time input option for users 
6) Added "last completed" field to cards (for help with card filtering)
7) Created backend infastructure that saves a user's pactice schedule into a Deck object (for use later in creating calendars / past schedules)
9) Increased card filtering complexity by presenting least-recently viewed cards first
10) Migrated database from SQLite to PostgreSQL
11) Deployed to Heroku
12) Styling added to Login, Registration, Course List, and Card List pages (cool button effects :) )
13) Last completed date added to card

## Iteration 5 Summary

1) Added extra course data so there is more content for the app
2) Added a calendar so the user can view their old schedules
3) Added a landing page with more information about the app before logging in
4) Fixed deployment issue on Heroku (previously getting 404 error)
5) Commented all code
6) Started bug fixing (will do more before Tuesday) to fix issues listed on GitHub
7) Restyled various components (on separate branch, not yet merged to Heroku)
8) Added a welcome page that the user can see when the first login
9) Styled card display and selection page
10) Added checkpoints on selection to ensure that the user chose skills and a time to practice before proceeding
11) Fixed bugs in Side bar to have correct button functionality
