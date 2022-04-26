import request from './request';
import api from './api.js';

export async function fetchUpload(body, path) {
  return request
    .post(api.upload, body, { headers: { 'X-PATH': path } })
    .then((data) => {
      return data;
    });
}
