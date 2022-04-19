const resClient = require('../tools/resClient');
const ImagesFiles = require('../model/ImagesFiles');
const { uploadBufferToGFS, downloadImageById } = require('../db/mongodb');

const uploadImage = async (req, res, next) => {
  const files = req.files;
  const data = files.map((file) => {
    return {
      name: file.originalname,
      mimetype: file.mimetype,
      buffer: file.buffer,
    };
  });
  Promise.all(
    data.map((file) => {
      return uploadBufferToGFS(file.buffer, file.name);
    })
  )
    .then(() => {
      resClient.success({
        res,
        data: '上传成功',
      });
    })
    .catch((err) => {
      resClient.fail({
        res,
        errMsg: '上传失败',
      });
    });
};

const getList = async (req, res, next) => {
  try {
    const page = req.query.page;
    const list = await ImagesFiles.getList(page);
    const total = await ImagesFiles.count();
    resClient.success({
      res,
      data: {
        list,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getImage = async (req, res, next) => {
  const id = req.query.id;
  let data = await downloadImageById(id);
  if (data) {
    resClient.success({
      res,
      data: data,
    });
  } else {
    resClient.fail({
      res,
      errMsg: '无该图片数据',
    });
  }
};

module.exports = {
  uploadImage,
  getList,
  getImage,
};
