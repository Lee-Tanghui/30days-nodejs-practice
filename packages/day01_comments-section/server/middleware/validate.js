const HTTP_STATUS = require('../../../@common/httpStatus');
const RES_CODE = require('../../../@common/resCode');

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

module.exports = validateRequest;
