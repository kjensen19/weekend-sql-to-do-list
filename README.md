# ToDo Calendar

## Description
Duration: 4 days

A combination todo app and calendar app that displays todo items on their targeted completion days.  Items can be clicked to show a more detailed view on a side panel, tasks can be marked as completed which is denoted by both text and green coloration.  Tasks can also be deleted which removes them from the calendar and the task database. Designed to address the need for both apps (because clearly there aren't any other options). I also used it as an opportunity to explore bootstrap modals and offcanvases.

## Prerequisites
Will be found in package.json:
  Node.js
  BodyParser
  Express
  PG
  Some SQL manager (I used Postico)
 

## Installation
Create a database named your 'weekend-to-do-app',

The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.

In this instance the insert statement for the calendar table is built on recursive SQL to generate a complete set of calendar data, current parameters are for 09-01-2022 through 12-31-2023, these may be modified where noted

Open up your editor of choice, start your node.js server instance and navigate to localhost:5000

## Usage

1. The task insert query only generates one entry. On page load it will be displayed over the calendar.  All current tasks (completed or not) will display on this window (bootstrap modal).  Completed tasks are highlighted in green.
2. After closing the window, the calendar will be available (currently set to Sept 2022).
3. Clickable tasks will display on their target calendar dates.
4. Clicking the task will open a side bar over the left part of the screen with more detailed task information and buttons to complete or delete the task.
5. At top right there is a dropdown menu to navigate to a new month
6. At bottom left there is a button to pop a window to create a new task (by entering a description and a target date)
7. Changing by completing, deleting or adding a task should re-prompt the opening display of all tasks.

## Built With
HTML/CSS/Javascript/jQuery/Node(Express)/Postrgessql/postico

## Support
If you have suggestions or issues, please e-mail me at kjensen19@gmail.com
