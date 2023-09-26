import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Create an HTTP link to connect to your GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // Specifies the URI of your GraphQL server
});

// Create an authentication link that adds the token to request headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach the token as a Bearer token if it exists
    },
  };
});

// Create an Apollo Client instance with the authentication link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine the authentication and HTTP links
  cache: new InMemoryCache(), // Use an in-memory cache for storing data
});

// Define the main App component
function App() {
  return (
    <ApolloProvider client={client}> {/* Provide the Apollo Client to the component tree */}
      <Router>
        <>
          <Navbar /> {/* Render the Navbar component */}
            <Routes>
              <Route path='/' element={<SearchBooks />} /> {/* Route for the SearchBooks component */}
              <Route path='/saved' element={<SavedBooks />} /> {/* Route for the SavedBooks component */}
              <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} /> {/* Route for unknown paths */}
            </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App; // Export the App component
