'use strict';

module.exports = function (app) {
  app.get('/*', (req, res) => {
    if (req.path === '/login' || req.path === '/register') {
      return res.render('index');
    }
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }
    return res.render('index');
  });
};
