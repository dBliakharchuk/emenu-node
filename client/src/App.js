import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import { getSession } from './store/actions/auth-action';

import { Header } from './modules/header/header';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
});

const App = ({ getSession, authorization }) => {
  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header isAuthenticated={authorization.isAuthenticated} />
          <Routes />
        </div>
      </Router>
    </ApolloProvider>
  );
};

const mapStateToProps = ({ restAuthReducer }) => {
  return {
    authorization: restAuthReducer,
  };
};

const mapDispatchToProps = {
  getSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
