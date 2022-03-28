import request from './request';
import api from './api.js';

export async function fetchCityList() {
  return request.get(api.cityList).then((data) => data);
}

export async function fetchCityWeather(adcode) {
  return request.get(api.weather, { params: { adcode } }).then((data) => data);
}
