### Heroku Link: https://disco-moose.herokuapp.com/

## What we did
1. Utilized local storage to create login persistance to make page refresh re-render the component currently displayed without loging you out
2. Added user registration functionality
3. Added a functional sidebar with a button for loging out
4. Added logout functionality
5. Added a time input option for users
6. Added "last completed" field to cards (for help with card filtering)
7. Created backend infastructure that saves a user's pactice schedule into a Deck object (for use later in creating calendars / past schedules)
8. Increased card filtering complexity by presenting least-recently viewed cards first
9. Migrated database from SQLite to PostgreSQL
10. Deployed to Heroku
11. Styling added to Login, Registration, Course List, and Card List pages (cool button effects :) )
12. Last completed date added to card

## Challenges

- Heroku proved very challenging because we had to refactor parts of the code to make it work and migrate the entire database from SQLite to PostGreSQL.
- Migrating everyone to PostGres was also challenging because a lot of us had messed up environment variables

## How to Improve

- Start Heroku work earlier
- Planning fallacy: We didn't fully understand how long certain aspects of this iteration would take
