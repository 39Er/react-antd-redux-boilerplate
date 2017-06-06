'use strict';

const user = require('./controller/userController');

module.exports = function (app) {
  app.post('/login', user.login);
  app.post('/register', user.register);
  app.post('/*', (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.send({
        statusCode: '502',
        message: 'Session 已过期，请刷新后重新登录！',
      });
    }
    return next();
  });
};
