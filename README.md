# MyReads Project

In this project, I have created a bookshelf appliction that allows user to select and categorize books they have read, are currently reading, or want to read.
The project emphasizes using React to build the application. It uses the provided API server and client library that I used to persist information as I interact with the application.

I started this project with the starter code provided and added interactivity to the app by refactoring the static code in the template.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file BooksAPI.js contains the methods you will need to perform necessary operations on the backend:

- getAll
- update
- search

## Installation Instructions

To run this project, download or clone the repository in your local machine:

`git clone https://github.com/maryum2022skipq/Udacity_React_Project_1.git`

Next, in the repository folder install all project dependencies using the command:

`npm install`

and start the server with

`npm start`

## App Functionality

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

- Currently Reading
- Want to Read
- Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

The main page also has a link to `/search`, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library. To keep the interface consistent, you may consider re-using some of the code you used to display the books on the main page.

When a book is on a bookshelf, it should have the same state on both the main application page and the search page.

The search page also has a link to `/` (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.

