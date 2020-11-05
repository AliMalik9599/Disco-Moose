# Retrospective - Iteration 3 

### What we did:
 - Added Material UI components to the front end to style the app (made use of Cards, Boxes, FormGroups, Checkbox, etc)
 - Login: reformatted function based views to class based views and changed login authentication system to Django Rest API token authentication system
 - Login styling: on another branch
 - Added side bar (still on branch, not merged into master) and created correct routes to different components of the app when the user clicks on certain links
 - Added functionality for card completion and card favoriting (and styling to indicate the selection)
      -  able to remove skill selection from list
 - Generated a global theme for colors within the app and created a style guide (found in docs folder)
 
### Challenges:
 - login authentication - session tokens were not being passed around correctly
 - didn't fully understand the difference between Django and Django Rest API
 - having to convert front end components to functions to make it work with Material UI components
 - merge conflicts/not fully testing code before merging into master :)
 - side bar
      - side bar overwrites the nav bar
      - figuring out when the user should have access to the side bar and when they should not see it

### How to Improve:
 - Spend more time with tutorials for certain skills (also start individual sections earlier in case we run into road blocks)
 - Need a better wireframe/prototype before trying to style
 - Working on smaller chunks of code earlier instead of trying to take on huge chunks all at once
 - Testing before merging branches into master

### Things we didn't quite finish:
 - adding extra data to the backend so we have more cards in the database
 - styling login page correctly (on another branch)
 - side bar functionality
