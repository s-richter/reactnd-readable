# Readable: A comment web app - Udacity Nanodegree - Project 2

This app allows the user to view and create posts, comment on their and others' posts, vote on posts and comments, and edit and delete posts and comments. Posts are grouped into fixed categories, and can be sorted by the number of votes, the timestamp and comment count (only posts).


## About

This is the second project for the Udacity React Nanodegree.
For this app to work, it has to communicate with a backend server, where the posts and comments are stored.
The user can view, edit, delete and create posts and comments. Each post is associated with a category. There are several views:
* the main view, where the available categories and all posts are shown
* a category view, where only the posts of a certain category are shown
* a post details view, where the details of a post and all its comments are shown
* a modal dialog to add a new post
* a modal dialog to edit an existing post
* a modal dialog to add a new comment
* a modal dialog to edit an existing comment

The is no user authentication or authorization, so a user can edit and delete every post or comment.

Furthermore, the user can vote up or down a post or a comment, with the resulting score being shown for each post and comment.

Additionally, posts and comments can be sorted by vote score, timestamp (last edit) and by comment count (only posts).


## Installing

To install the backend server:

1. run `git clone https://github.com/udacity/reactnd-project-readable-starter` to clone the backend repository
2. type `cd reactnd-project-readable-starter` to change the directory
3. run `npm install` to install
4. run `node server` to start the server. This should launch the backend server at http://localhost:3001/

To install the frontend (this project):

1. run `git clone https://github.com/s-richter/reactnd-readable` to clone the frontend repository
2. type `cd reactnd-readable` to change the directory
3. run `npm install` to install
4. run `npm start` (or `yarn start`) to start the app
5. on your browser, navigate to http://localhost:3000/, if no browser window or tab was opened automatically


## Built With

* [React](https://facebook.github.io/react/) - the UI framework
* [React Router](https://reacttraining.com/react-router/) - routing for React
* [Reactstrap](https://reactstrap.github.io/) - Bootstrap 4 for React
* [Bootstrap 4] (https://v4-alpha.getbootstrap.com/) - Bootstrap 4 (alpha)
* [Redux](https://github.com/reactjs/redux) - Redux for state management
* [Redux Thunk] (https://github.com/gaearon/redux-thunk) - Thunk middleware for Redux
* [React Icons](https://github.com/gorangajic/react-icons) - Font Awesome Icons for React
* [History] (https://github.com/ReactTraining/history) - Browser History
* [uuid] (https://github.com/kelektiv/node-uuid) - package to generate UUIDs


## Authors

* [backend providers](https://github.com/udacity/reactnd-project-readable-starter) - *complete backend server* - by the Udacity React Nanodegree team
* Stephan Richter - React frontend


## Contributing

Due to the nature of this project (final assessment project for Udacity's Redux course), no contributions by others are possible.