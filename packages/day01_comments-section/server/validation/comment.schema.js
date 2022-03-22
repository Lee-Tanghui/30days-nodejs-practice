const Joi = require('joi');

module.exports = {
  // 添加留言
  addCommentSchema: Joi.object({
    content: Joi.string()
      .max(200)
      .required()
      .error(() => new Error('请填写正确的留言（不超过200个字符）')),
  }),
  // 删除留言
  deleteCommentSchema: Joi.object({
    cid: Joi.string()
      .required()
      .error(() => new Error('cid参数必填')),
  }),
};
