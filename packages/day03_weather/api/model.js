import request from './request';
import api from './api.js';

export async function fetchHello() {
  return request.get(api.hello).then((data) => data);
}
