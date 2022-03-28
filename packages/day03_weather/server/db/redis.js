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
        const isDev = config.NODE_ENV === 'development';

        client.on('error', (error) => {
          logger.error(error);
          if (isDev) {
            console.error('Redis连接失败：', error)
          }
        });

        await client.connect();
        isDev && console.log(chalk.green(`✅Redis connected`));

        redis.client = client;

        resolve();
      } catch (error) {
        logger.error(error);
        reject(error);
      }
    });
  },
};

module.exports = redis;
