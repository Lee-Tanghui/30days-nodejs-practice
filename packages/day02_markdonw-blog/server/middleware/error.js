const logger = require('../../logger/index');
const RES_CODE = require('../tools/resCode');
const resClient = require('../tools/resClient');
const { NODE_ENV } = require('../../config/server.config');

exports.errorHandler = function (err, req, res, next) {
  logger.error(err);
  NODE_ENV !== 'production' && console.error(err);
  resClient.fail({ res, errMsg: RES_CODE.INNER_ERROR });
};
