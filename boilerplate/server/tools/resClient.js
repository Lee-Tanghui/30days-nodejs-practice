const HTTP_STATUS = require('./httpStatus');
const RES_CODE = require('./resCode');

module.exports = {
  success({ res, data = null, status = HTTP_STATUS.OK }) {
    res.status(status).json({
      code: RES_CODE.SUCCESS,
      data
    });
  },
  fail({ res, errMsg, status = HTTP_STATUS.INTERNAL_SERVER_ERROR }) {
    res.status(status).json({
      code: RES_CODE.ERROR,
      errMsg,
    });
  },
};
