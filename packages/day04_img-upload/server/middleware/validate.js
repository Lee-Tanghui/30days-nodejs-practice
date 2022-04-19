const HTTP_STATUS = require('../tools/httpStatus');
const RES_CODE = require('../tools/resCode');

const validateRequest = function (schema) {
  return function (req, res, next) {
    let data = ['PUT', 'POST'].includes(req.method) ? req.body : req.query;
    const valid = schema.validate(data);
    if (valid.error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        code: RES_CODE.ERROR,
        errMsg: valid.error.message,
      });
    } else {
      next();
    }
  };
};



module.exports = validateRequest
