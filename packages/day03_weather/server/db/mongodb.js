const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('../../config/server.config');
const logger = require('../../logger');

const mongoUrl = config.MONGO_URL;

module.exports = {
  async connect() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongoUrl, {
          useNewUrlParser: true,
        })
        .then(() => {
          config.NODE_ENV === 'development' &&
            console.log(
              chalk.green(`✅MongoDB Connected to ${config.DB_NAME}`)
            );
          resolve();
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  },
};
