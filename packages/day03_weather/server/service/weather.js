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
 * @desc 获取单个城市的天气请求
 * @param {String} adcode 城市adcode
 * @returns
 */
const getSingleCityRequest = (adcode) => {
  return axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
    params: {
      key: config.AMAP_API_KEY,
      city: adcode,
      extensions: 'all',
    },
  });
};

/**
 *
 * @returns 请求天气数据
 */
const fetchWeatherData = async () => {
  let data = [];
  const adCodeList = cityList.map((i) => i.adcode);
  const requestList = getAllCityRequests(adCodeList);
  const resList = await axios.all(requestList);
  if (resList.length) {
    const errorAdCodeList = []; // 用户存放请求高德开发平台失败的请求，以进行失败重试
    resList.map((i, index) => {
      const { info } = i.data;
      if (info === 'OK') {
        // 请求成功
        data.push(i.data.forecasts);
      } else {
        // 请求失败
        errorAdCodeList.push(adCodeList[index]);
      }
    });

    // 失败重试
    if (errorAdCodeList.length) {
      logger.error('请求下列城市失败' + JSON.stringify(errorAdCodeList));

      const twiceRequestList = getAllCityRequests(errorAdCodeList);
      const resList = await axios.all(twiceRequestList);

      if (resList.length) {
        resList.map((i) => {
          const { info } = i.data;

          if (info === 'ok') {
            data.push(i.data.forecasts);
          }
        });
      }
    }

    return data.flat().map((i) => {
      // 直辖市会以“城区”显示，这里进行一个替换操作
      if (i.city.includes('城区')) {
        i.city = i.city.replace('城区', '市');
      }
      // 将实时天气用live保存
      if (i.casts.length) {
        i.live = i.casts[0];
        i.casts = i.casts.slice(1);
      }
      return i;
    });
  } else {
    return null;
  }
};

module.exports = {
  fetchWeatherData,
};
