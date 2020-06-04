import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InitPage from './modules/home/init';
import Login from './modules/authentication/login';
import Register from './modules/authentication/registration';

const Routes = () => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Switch>
        <Route path={'/'} exact component={InitPage} />
      </Switch>
    </>
  );
};

export default Routes;
