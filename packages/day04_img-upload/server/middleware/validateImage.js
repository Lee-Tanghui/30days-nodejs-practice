const HTTP_STATUS = require('../tools/httpStatus');
const resClient = require('../tools/resClient')

const validateImage = function () {
  return function (req, res, next) {
    const files = req.files;
    // 判断是否有文件
    if (!files || !files.length) {
      resClient.fail({
        res,
        errMsg: '请上传至少一张图片',
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }
    // 判断MIME类型是否为图片
    const mimes = files.map((i) => i.mimetype);
    const allowedMimes = 'image/png,image/jpg,image/jpeg'.split(',');
    const isAllowed = mimes.every((mime) => allowedMimes.includes(mime));
    if (!isAllowed) {
      resClient.fail({
        res,
        errMsg: '请上传图片',
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }
    next()
  };
};

module.exports = validateImage