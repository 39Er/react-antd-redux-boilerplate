'use strict';

import React from 'react';
import { Route } from 'react-router-dom';


const routes = [
  {
    path: '/',
    exact: true,
    component: () => <div>haha</div>,
  },
];
const Routes = () => {
  return (
    <div>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        );
      })}
    </div>
  );
};

export default Routes;
