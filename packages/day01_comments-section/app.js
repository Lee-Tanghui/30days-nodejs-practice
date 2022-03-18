require('dotenv').config();
const next = require('next');
const mongoose = require('mongoose');
const axios = require('axios');
const pkg = require('./package.json');
const config = require('./config/server.config')

const dev = config.NODE_ENV;
const app = next({ dev });
const mongoUrl = config.MONGO_URL;

axios.defaults.baseURL = config.LOCAL_BASE_URL

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB Connected to ${pkg.name}`);
  })
  .catch((err) => console.log(err));

app.prepare().then(() => {
  require('./server');
});

module.exports = app;
