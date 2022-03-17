const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const pkg = require('../package.json');
const comment = require('./routes/comment');
const user = require('./routes/user');
const userSession = require('./middleware/userSession');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const mongoUrl = `mongodb://127.0.0.1:27017/${pkg.name}`;

axios.defaults.baseURL = `http://localhost:${port}`;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB Connected to ${pkg.name}`);
  })
  .catch((err) => console.log(err));

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(
    session({
      key: 'SESSION_ID',
      secret: pkg.name,
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, signed: true }, // 30天后过期
      store: MongoStore.create({ mongoUrl }), // session持久化
    })
  );

  server.use(userSession);
  server.use('/api/comment', comment);
  server.use('/api/user', user);
  server.all('*', async (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    process.env.LOCAL_HOST = `http://localhost:${port}`;
    console.log(`> Ready on ${process.env.LOCAL_HOST}`);
  });
});
