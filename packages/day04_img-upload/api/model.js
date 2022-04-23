import request from './request';
import api from './api.js';


export async function fetchList(page) {
  return request.get(api.upload, { params: { page } }).then((data) => data);
}

export async function fetchImage(id) {
  return request.get(api.img, { params: { id } }).then((data) => data);
}
