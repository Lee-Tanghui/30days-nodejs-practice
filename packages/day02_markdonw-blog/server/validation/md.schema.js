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
  // 查询博客
  getSchema: Joi.object({
    page: Joi.number()
      .required()
      .integer()
      .min(1)
      .error(() => new Error('page为大于1的正整数')),
    pageSize: Joi.number()
      .required()
      .integer()
      .min(1)
      .max(50)
      .error(() => new Error('pageSize为大于1,小于50的正整数')),
  }),
  // 获取博客内容
  getBlogContentSchema: Joi.object({
    bid: Joi.string()
      .required()
      .error(() => new Error('bid为必填项')),
  }),
};
