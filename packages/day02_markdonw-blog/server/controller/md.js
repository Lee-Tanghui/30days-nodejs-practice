const resClient = require('../tools/resClient');
const { saveLocal } = require('../tools/imageHandler');
const BlogModel = require('../model/Blog');

const saveImg = async (req, res, next) => {
  try {
    const { body } = req;
    const { code, error, data } = await saveLocal(body);
    if (!code) {
      resClient.success({ res, data });
    } else {
      resClient.error({ res, errMsg: error });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { uid } = req.session;
    await BlogModel.add({ title, content, uid });
    resClient.success({ res, data: '发布成功！' });
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const data = await BlogModel.get(uid);
    resClient.success({ res, data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveImg,
  create,
  getBlog,
};
