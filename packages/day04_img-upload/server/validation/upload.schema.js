const Joi = require('joi');
const mongoose = require('mongoose');

module.exports = {
  // 获取列表
  getListSchema: Joi.object({
    page: Joi.number()
      .required()
      .integer()
      .min(1)
      .error(() => new Error('page必传，为大于1的正整数')),
  }),
  getImageSchema: Joi.object({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          throw new Error('非法id');
        } else {
          return value;
        }
      })
      .error((error) => {
        return new Error('id参数错误')
      }),
  }),
};
