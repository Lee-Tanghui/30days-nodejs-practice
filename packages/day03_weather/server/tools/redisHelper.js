const pkg = require('../../package.json');

// 城市天气的Redis的key的前缀
const CITY_WEATHER_PREFIX = `${pkg.name}:weather:city`;
// 获取城市天气的Redis的key
const getRedisCityWeatherKey = (adcode) => {
  return `${CITY_WEATHER_PREFIX}:${adcode}`;
};

module.exports = {
  CITY_WEATHER_PREFIX,
  getRedisCityWeatherKey,
};
