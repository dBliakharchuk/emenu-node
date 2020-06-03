import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <p>Outside of router</p>
            <Routes />
          </header>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
