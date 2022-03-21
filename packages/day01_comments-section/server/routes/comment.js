const express = require('express');
const router = express.Router();

const {
  getCommentList,
  addComment,
  deleteComment,
} = require('../controller/comment');
const {
  addCommentSchmea,
  deleteCommentSchame,
} = require('../validation/comment.schema');
const validateRequest = require('../middleware/validate');
const checkUser = require('../middleware/checkUser');

router.get('/', getCommentList);
router.post('/', validateRequest(addCommentSchmea), addComment);
router.delete(
  '/',
  [validateRequest(deleteCommentSchame), checkUser],
  deleteComment
);

module.exports = router;
