require('dotenv').config();
const next = require('next');
const axios = require('axios');
const config = require('./config/server.config');
const mongodb = require('./server/db/mongodb');

const dev = config.NODE_ENV;
const app = next({ dev });

axios.defaults.baseURL = config.LOCAL_BASE_URL;

const appStart = async () => {
  await mongodb.connect();
  app.prepare().then(() => {
    require('./server');
  });
};

appStart()

module.exports = app;
