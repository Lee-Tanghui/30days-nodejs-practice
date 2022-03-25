const chalk = require('chalk');
const { createClient } = require('redis');
const config = require('../../config/server.config');
const logger = require('../../logger');

const redis = {
  client: null,
  async connect() {
    return new Promise(async (resolve, reject) => {
      try {
        const client = createClient();

        client.on('error', (error) => {
          logger.error(error);
        });

        await client.connect();
        config.NODE_ENV === 'development' &&
          console.log(chalk.green(`✅Redis connected`));

        redis.client = client;

        resolve();
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    });
  },
};



module.exports = redis
