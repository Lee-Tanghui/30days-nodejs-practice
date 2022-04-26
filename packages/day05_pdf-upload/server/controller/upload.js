const multer = require('multer')
const resClient = require('../tools/resClient');
const upload = require('../middleware/pdfUpload');

const uploadFile = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      resClient.fail({
        res,
        errMsg: err.message || '上传失败',
      });
    } else if (err) {
      resClient.fail({
        res,
        errMsg: err,
      });
    } else {
      resClient.success({
        res,
        data: 'ok',
      });
    }
  });
};

module.exports = {
  uploadFile,
};
