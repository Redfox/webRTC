import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Room from 'pages/room';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/room/:roomName" component={Room} />
    </Switch>
  )
}

export default Routes;
