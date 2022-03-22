const express = require('express');
const router = express.Router();

const {
  getCommentList,
  addComment,
  deleteComment,
} = require('../controller/comment');
const {
  addCommentSchema,
  deleteCommentSchema,
} = require('../validation/comment.schema');
const validateRequest = require('../middleware/validate');
const checkUser = require('../middleware/checkUser');

router.get('/', getCommentList);
router.post('/', validateRequest(addCommentSchema), addComment);
router.delete(
  '/',
  [validateRequest(deleteCommentSchema), checkUser],
  deleteComment
);

module.exports = router;
