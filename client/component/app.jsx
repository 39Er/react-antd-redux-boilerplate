'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';

render((
  <BrowserRouter>
    <div>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
    </div>
  </BrowserRouter>
), document.getElementById('root'));
