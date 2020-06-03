import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InitPage from './modules/home/init';

const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={InitPage} />
    </Switch>
  );
};

export default Routes;
