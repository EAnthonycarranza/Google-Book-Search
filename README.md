# MERN Book Search Engine

![MERN](https://img.shields.io/badge/MERN-Stack-green)

This project is a Book Search Engine built using the MERN stack (MongoDB, Express.js, React, Node.js), refactored to implement a GraphQL API with Apollo Server, replacing the existing RESTful API. The application allows users to search for books, save them to their account, and view their saved books.

## User Story

AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase


## Features

- **Search for Books:** Users can search for books and view the results containing the book’s title, author, description, image, and a link to that book on the Google Books site.
- **User Authentication:** Users can sign up, log in, and log out, with secured password hashing and JWT for user authentication.
- **Save Books:** Logged-in users can save books to their account.
- **View Saved Books:** Users can view and manage the books saved to their account.
- **Remove Saved Books:** Users can remove books from their saved list.
  
## Technologies Used

- **Frontend:**
  - React.js
  - Apollo Client
  
- **Backend:**
  - Node.js
  - Express.js
  - Apollo Server
  - GraphQL
  - JWT for authentication
  
- **Database:**
  - MongoDB
  
## Installation and Setup

1. Clone the Repository
   
   git clone https://github.com/EAnthonycarranza/Google-Book-Search.git
   cd Google-Book-Search

  * Install NPM Packages

      npm install

  * Set Up Environment Variables

    Create a .env file in the root directory.
    Add the MongoDB connection string as MONGODB_URI.

  * Start the Server

    npm start

  The application will be live at http://localhost:3001


## Deployment

The application is deployed to Heroku [here](https://google-testingbooks-c7c4f824dbd3.herokuapp.com/).

## License

This project is distributed under the MIT License. See [LICENSE](https://opensource.org/licenses/MIT) for more information.


