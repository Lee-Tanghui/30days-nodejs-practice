const axios = require('axios');
const config = require('../../config/server.config');
const cityList = require('../store/city.json');
const logger = require('../../logger/index');

/**
 * @desc 获取所有城市的天气请求
 * @param {Array} adCodeList 城市adcode数组
 * @returns
 */
const getAllCityRequests = (adCodeList) => {
  return adCodeList.map((adcode) => getSingleCityRequest(adcode));
};

/**
 * @desc 获取单个城市的实时天气
 * @param {String} adcode 城市adcode
 * @returns
 */
 const getSingleCityRequest = (adcode) => {
  return axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
    params: {
      key: config.AMAP_API_KEY,
      city: adcode,
      extensions: 'base',
    },
  });
};

/**
 *
 * @returns 请求天气数据
 */
const fetchWeatherData = async () => {
  const adCodeList = cityList.map((i) => i.adcode);
  const requestList = getAllCityRequests(adCodeList);
  const resList = await axios.all(requestList);
  if (resList.length) {
    return resList.map(i => i.data.lives?.[0])
  } else {
    return null;
  }
};

module.exports = {
  fetchWeatherData,
};
