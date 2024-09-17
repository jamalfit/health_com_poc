import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import LocationList from './Components/LocationList';

// Create the Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Make sure this matches your server's URL
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Healthcare Locations</h1>
        </header>
        <main>
          <LocationList />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;