const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the req object to context
});

// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start the Apollo Server
async function startApolloServer() {
  await server.start();

  // Middleware for Apollo Server
  server.applyMiddleware({ app });

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  }
}

// Move server startup outside of db.once
function startServer() {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start both the Apollo Server and Express server
async function main() {
  await startApolloServer();
  startServer();
}

main();
