# Software Requirements Specifications

## Problem Statement 

When learning a new skill, it is important for a person to not only practice, but to practice deliberately. Creating a schedule for deliberate practice takes a lot of effort, because it requires breaking the overarching skill into smaller pieces, then organizing those pieces into an order that makes sense to learn. Current schedule creating apps are too broad to use as a tool for deliberate practice as they do not focus on specific skills and do not assist the user in splitting up and ordering the larger skill into subskills.


## Potential Clients
Potential users would be those interested in learning a new skill. While the software should be flexible enough to apply to most skills, it would be good to focus on popular skills that already have a large library of tasks and a large user base. People learning how to play guitar, workout, or cook, for example, could be the first set of clients. 


## Proposed Solution
We propose a card-based app which creates a regimented, deliberate practice schedule for clients. The app would have a catalog of practice cards for a given skill. Each card is categorized by type and includes data such as difficulty, time intensity, and whether the card has been used already. For example, one practice card may be “mincing” which would be categorized as a “knife sub-skill” under the overarching cooking skill. Each day a user can specify how long they would like to practice (e.g. 30 minutes) and based on card-data, the app would construct a schedule with suggested cards, both new and repeated. Users can also create a schedule ahead of time for future sessions.

## Functional Requirements


### Must have
- As a user of the app, I want to be able to create new practice “decks” so that I can learn new skills
- As a user of the app, I want to be able to store my “decks” and “cards” for later use so that I can come back to them in future sessions.
- As a user of the app, I want to be able to view all of my created “decks” and all of my created “cards” so I know what “decks” and “cards” are available to practice with.
- As a user of the app, I want to be able to create a daily practice schedule with a specific “deck” so that I can learn a new skill.
- As a user of the app, I want to be able to view “card” metadata, such as difficulty, topic, and time commitment so that I can better choose what to practice.


### Nice to have
- As a user of the app, I want to be able to keep track of my previous, current, and future daily practice schedules so that I can map my learning.
- As a user of the app, I want to be able to make notes on “cards” so I can refer back to previous challenges and thoughts.
- As a user of the app, I want to be able to view and download other peoples “decks” so that I can learn from others.


## Software Architecture
The software would be a web application. It would conform to the Client-Sever software architecture.

Front end: React 

Back end: Django

## Wireframes
![](wireframe.png)
