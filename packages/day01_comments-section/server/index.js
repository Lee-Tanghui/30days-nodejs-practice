const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const config = require('../config/server.config');
const route = require('../server/routes');
const userSession = require('../server/middleware/userSession');

const port = config.PORT;
const mongoUrl = config.MONGO_URL;

const app = require('../app');

const handle = app.getRequestHandler();
const server = express();

server.use(bodyParser.json());
server.use(
  session({
    key: config.SESSION_KEY,
    secret: config.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: config.LOCAL_BASE_URL,
    store: MongoStore.create({ mongoUrl }), // session持久化
  })
);

server.use(userSession);
server.use('/api', route);
server.all('*', async (req, res) => {
  return handle(req, res);
});

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Ready on ${process.env.LOCAL_HOST}`);
});

module.exports = server;
