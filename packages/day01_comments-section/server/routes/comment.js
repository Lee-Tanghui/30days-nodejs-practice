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

router.get('/', getCommentList);
router.post('/', validateRequest(addCommentSchmea), addComment);
router.delete('/', validateRequest(deleteCommentSchame), deleteComment);

module.exports = router;
