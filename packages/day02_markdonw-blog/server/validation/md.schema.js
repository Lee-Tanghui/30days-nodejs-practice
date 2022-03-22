const Joi = require('joi');

module.exports = {
  // 存储图片
  saveImgSchema: Joi.object({
    imgData: Joi.string()
      .required()
      .error(() => new Error('imgData参数为必填项')),
  }),
  // 创建博客
  createSchema: Joi.object({
    title: Joi.string()
      .required()
      .error(() => new Error('title为必填项')),
    content: Joi.string()
      .required()
      .error(() => new Error('content为必填项')),
  }),
};
