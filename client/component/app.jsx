'use strict';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import Home from './Home';

render((
  <BrowserRouter>
    <Route path="/" component={Home} />
  </BrowserRouter>
), document.getElementById('root'));
