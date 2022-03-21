const logger = require('../../logger/index');
const HTTP_STATUS = require('../../../@common/httpStatus');
const RES_CODE = require('../../../@common/resCode');

exports.errorHandler = function (err, req, res, next) {
  logger.error(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    code: RES_CODE.ERROR,
    errMsg: RES_CODE.INNER_ERROR,
  });
};
