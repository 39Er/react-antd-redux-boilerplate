'use strict';

const bunyan = require('bunyan');
const config = require('config');

module.exports.config = config;
module.exports.logger = bunyan.createLogger({
  name: config.get('mainLog.mainLogName'),
  level: config.get('mainLog.mainLogLevel'),
  src: config.get('mainLog.mainLogSrc'),
});

