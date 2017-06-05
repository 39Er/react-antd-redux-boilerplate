'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { createStore } from 'redux';
// import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';

render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
