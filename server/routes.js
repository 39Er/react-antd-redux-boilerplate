'use strict';

module.exports = function (app) {
  app.post('/login', (req, res) => {
    return res.send({
      statusCode: '200',
      result: 'login success',
    });
  });
};
