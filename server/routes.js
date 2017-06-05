'use strict';

const user = require('./controller/userController');

module.exports = function (app) {
  app.post('/login', user.login);
  app.post('/register', user.register);
};
