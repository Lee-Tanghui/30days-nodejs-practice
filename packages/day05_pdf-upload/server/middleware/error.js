const logger = require('../../logger/index');
const RES_CODE = require('../tools/resCode');
const resClient = require('../tools/resClient')

exports.errorHandler = function (err, req, res, next) {
  logger.error(err);
  resClient.fail({ res, errMsg: RES_CODE.INNER_ERROR })
  throw err
};
