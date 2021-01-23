import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Show from '../pages/Show';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:slug" component={Show} />
  </Switch>
);

export default Routes;
