'use static';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
const mongoose = require('mongoose');
const redis = require('redis');
const consolidate = require('consolidate');
const config = require('./commonUtil').config;
const logger = require('./commonUtil').logger;

const app = express();
const isDev = process.env.NODE_ENV !== 'production';
const port = config.get('port');
const dburl = 'mongodb://' + config.get('mongoConfig.mongoHost')
  + ':' + config.get('mongoConfig.mongoPort') + '/' + config.get('mongoConfig.dbName');

//  connect redis
const redisClient = redis.createClient(config.get('redisConfig'));
redisClient.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});


// view engine setup
// app.engine('html', require('ejs').renderFile);
app.engine('html', consolidate.ejs);
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'html');
// local variables for all views
app.locals.env = isDev ? 'dev' : 'production';

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'ACDataServer',
  cookie: {
    maxAge: 12 * 60 * 60 * 1000,
  },
  proxy: true,
  saveUninitialized: true,
  resave: false,
}));

if (isDev) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const wpconfig = require('./webpack.config.js');
  const compiler = webpack(wpconfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: wpconfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, '/client/public')));
require('./server/routes')(app);
require('./client/router/routes')(app);

app.listen(port, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  //  connect mongo
  mongoose.Promise = Promise;
  mongoose.connect(dburl, (error) => {
    if (error) {
      logger.error(error);
      process.exit(1);
    }
  });
  logger.info('==> Listening on port: %s', port);
});
