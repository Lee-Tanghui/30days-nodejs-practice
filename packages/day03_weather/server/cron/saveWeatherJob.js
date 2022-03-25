const config = require('../../config/server.config');
const { CronJob } = require('cron');
const logger = require('../../logger/index');
const { fetchWeatherData } = require('../service/weather');
const CityWeatherModel = require('../model/CityWeather');
const redis = require('../db/redis');
const { getRedisCityWeatherKey } = require('../tools/redisHelper');

const CRON_TIME = '0 */30 * * * *';

const onTick = async function () {
  try {
    const weatherData = await fetchWeatherData(); // 获取指定城市数据
    await CityWeatherModel.insertMany(weatherData); // 插入MongoDB数据库中
    // 获取Redis的所有缓存数据
    const targetKey = getRedisCityWeatherKey('*');
    const keys = await redis.client.keys(targetKey);
    if (keys && keys.length) {
      console.log(...keys);
      await redis.client.del(keys);
    }
    logger.info('saveWeatherJob-定时任务执行成功');
  } catch (error) {
    logger.error(error);
  }
};

const saveWeatherJob = new CronJob({
  cronTime: CRON_TIME,
  onTick,
  runOnInit: config.START_JOB_INIT,
});

module.exports = saveWeatherJob;
