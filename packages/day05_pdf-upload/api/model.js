import request from './request';
import api from './api.js';

export async function fetchUpload(body) {
  return request.post(api.upload, body).then((data) => {
    return data;
  });
}
