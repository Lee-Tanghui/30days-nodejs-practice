const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const chalk = require('chalk');

const { errorHandler } = require('./middleware/error');
const config = require('../config/server.config');
const route = require('./routes');
const userSession = require('./middleware/userSession');

const port = config.PORT;
const mongoUrl = config.MONGO_URL;

const app = require('../app');

const handle = app.getRequestHandler();
const server = express();

server.use(express.static('assets'));
server.use(bodyParser.json({ limit: '4mb' }));
server.use(
  session({
    key: config.SESSION_KEY,
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: config.COOKIE_MAX_AGE,
    },
    store: MongoStore.create({ mongoUrl }), // session持久化
  })
);

server.use(userSession);
server.use('/api', route);
server.use(errorHandler);
server.all('*', async (req, res) => {
  return handle(req, res);
});

server.listen(port, (err) => {
  if (err) throw err;
  config.NODE_ENV === 'development' &&
    console.log(chalk.green(`🚀Ready on ${config.LOCAL_BASE_URL}`));
});

module.exports = server;
