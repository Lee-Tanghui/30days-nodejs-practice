require('dotenv').config();
const next = require('next');
const mongoose = require('mongoose');
const axios = require('axios');
const chalk = require('chalk');
const config = require('./config/server.config');
const logger = require('./logger/index')

const dev = config.NODE_ENV;
const app = next({ dev });
const mongoUrl = config.MONGO_URL;

axios.defaults.baseURL = config.LOCAL_BASE_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    config.NODE_ENV === 'development' && 
      console.log(chalk.green(`✅MongoDB Connected to ${config.DB_NAME}`));
  })
  .catch((err) => {
    logger.error(err)
  });

app.prepare().then(() => {
  require('./server');
});

module.exports = app;
