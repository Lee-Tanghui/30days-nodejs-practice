const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const resClient = require('../tools/resClient');

const writeFile = promisify(fs.writeFile);

const uploadFile = async (req, res, next) => {
  const file = req.body.file;
  const rp = req.body.rp;
  // 1. 判断path是否存在

  // 2. 判断是否有同名文件存在

  // 3. 如果有同名文件存在（需要修改名称为name(1).png）
  const dist = path.resolve(process.cwd(), './tmp', 'test.pdf');
  writeFile(dist, file)
    .then((response) => {
      resClient.success({ res, data: '上传成功' })
    })
    .catch((err) => {
      resClient.fail({ res, errMsg: '上传失败' });
    });
  // fs.writeFile(dist, file, (err) => {
  //   if (!err) {
  //     resClient.success({ res, data: '上传成功' });
  //   } else {
  //     resClient.fail({ res, errMsg: '上传失败' });
  //   }
  // });
};

module.exports = {
  uploadFile,
};
