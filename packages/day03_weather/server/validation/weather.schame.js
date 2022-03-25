const Joi = require('joi');

module.exports = {
  // 查询添加
  getWeatherDataSchema: Joi.object({
    adcode: Joi.string()
      .required()
      .error(() => new Error('adcode参数为必填项')),
  }),
};
