const Joi = require('joi');

module.exports = {
  // 点赞或取消点赞
  toggleLikeSchema: Joi.object({
    cid: Joi.string()
      .required()
      .error(() => new Error('cid参数必填')),
  }),
};
