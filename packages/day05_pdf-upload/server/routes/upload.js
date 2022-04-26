const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFile } = require('../controller/upload');

const router = express.Router();

// multer路由中间件（用于处理formData）
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = req.header['x-path'];
    // 判断文件是否过大

    // 判断path是否存在
    if (!path) {
      cb(new Error('路径不存在'));
      return 
    }
    // 判断是否有同名文件存在

    // 如果有同名文件存在（需要修改名称为name(1).png）
    cb(null, path.resolve(process.cwd(), './tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).any();

router.post('/', uploadFile);

module.exports = router;
