// Import necessary modules and packages
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Import your GraphQL schemas, resolvers, and database connection
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Import the authentication middleware
const { authMiddleware } = require('./utils/auth');

// Create an Apollo Server instance with your typeDefs, resolvers, and authentication context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware // This middleware will provide authentication context to your resolvers
});

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files in production (for client-side code)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Define a route to serve the client-side code (ensure that the path is correct)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
});

// Function to start Apollo Server and listen for incoming requests
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // Apply Apollo Server middleware to your Express app
  server.applyMiddleware({ app });

  // When the database connection is open, start the Express server
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the Apollo Server
startApolloServer(typeDefs, resolvers);
