import request from './request';
import api from './api.js';

export async function fetchUploadImage(data) {
  return request.post(api.uploadImage, { imgData: data }).then((data) => data);
}

export async function fetchCreateBlog({ title, content }) {
  return request.post(api.createBlog, { title, content }).then((data) => data);
}

export async function fetchBlogList({ page, pageSize }) {
  return request
    .get(api.getList, { params: { page, pageSize } })
    .then((data) => data);
}
