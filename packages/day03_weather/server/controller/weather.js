const resClient = require('../tools/resClient');
const logger = require('../../logger/index');
const redis = require('../db/redis');
const CityWeatherModel = require('../model/CityWeather');
const { getRedisCityWeatherKey } = require('../tools/redisHelper');
const cityList = require('../store/city.json');

const getCityData = async (req, res, next) => {
  try {
    resClient.success({
      res,
      data: cityList.map((i) => {
        return {
          name: i.name,
          adcode: i.adcode,
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

const getWeatherData = async (req, res, next) => {
  try {
    const { adcode } = req.query;
    const key = getRedisCityWeatherKey(adcode);
    let cache = await redis.client.get(key);

    if (!cache) {
      cache = await CityWeatherModel.getByAdCode(adcode);
      if (!cache) {
        resClient.fail({
          res,
          errMsg: '不支持该adcode的查询',
        });
        return;
      }
      await redis.client.set(key, JSON.stringify(cache));
    } else {
      cache = JSON.parse(cache);
    }

    resClient.success({
      res,
      data: cache,
    });
  } catch (error) {
    resClient.fail({
      res,
    });
    logger.error(error);
  }
};

module.exports = {
  getCityData,
  getWeatherData,
};
