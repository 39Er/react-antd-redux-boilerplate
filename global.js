'use strict';

const bunyan = require('bunyan');
const config = require('config');
const path = require('path');
const moment = require('moment');
const Mystream = require('bunyan-rotate-file-stream');

module.exports.config = config;

module.exports.logger = bunyan.createLogger({
  name: config.get('mainLog.name'),
  serializers: bunyan.stdSerializers,
  src: config.get('mainLog.src'),
  time: moment().format('YYYY-MM-DDTHH:mm:ss'),
  streams: [
    {
      level: 'error',
      type: 'raw',
      stream: new Mystream(path.join(__dirname, config.get('mainLog.errorLogPath'))),
    }, {
      level: config.get('mainLog.level'),
      stream: process.stdout,
    },
  ],
});
