import request from './request';
import api from './api.js';

export async function fetchAddComment(content) {
  return request.post(api.comment, { content }).then((data) => data);
}

export async function fetchCommentList() {
  return request.get(api.comment).then((data) => data);
}

export async function fetchCommentLike(cid) {
  return request.post(api.like, { cid }).then((data) => data);
}

export async function fetctCommentDel(cid) {
  return request.delete(api.comment, { params: { cid } }).then((data) => data);
}
