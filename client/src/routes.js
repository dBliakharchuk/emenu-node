import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InitPage from './modules/home/init';
import RestaurantEntities from './modules/entities/restaurants';
import UsersEntities from './modules/entities/users';

import Login from './modules/authentication/login';
import Register from './modules/authentication/registration';
import Logout from './modules/authentication/logout';

const Routes = () => {
  return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Switch>
        <Route path={'/logout'} component={Logout} />
        <Route path={'/entity/restaurants'} component={RestaurantEntities} />
        <Route path={'/entity/users'} component={UsersEntities} />
        <Route path={'/'} component={InitPage} />
      </Switch>
    </>
  );
};

export default Routes;
