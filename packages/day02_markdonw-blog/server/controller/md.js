const moment = require('moment');
const resClient = require('../tools/resClient');
const { saveLocal } = require('../tools/imageHandler');
const BlogModel = require('../model/Blog');
const HTTP_STATUS = require('../tools/httpStatus');

const saveImg = async (req, res, next) => {
  try {
    const { body } = req;
    const { code, error, data, status } = await saveLocal(body);
    if (!code) {
      resClient.success({ res, data });
    } else {
      resClient.fail({
        res,
        errMsg: error,
        status,
      });
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
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const { uid } = req.session;
    const count = await BlogModel.getCount(uid);
    const data = await BlogModel.get({ uid, page, pageSize });
    resClient.success({
      res,
      data: {
        list: data.map((item) => {
          item.create_date = moment(new Date(item.create_date)).format(
            'YYYY-MM-DD HH:mm'
          );
          return item;
        }),
        total: count,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getBlgContent = async (req, res, next) => {
  try {
    const { bid } = req.query;
    const { uid } = req.session;

    const blogContent = await BlogModel.getBlogContent(bid);

    if (blogContent) {
      const blogUid = blogContent.uid;
      if (blogUid !== uid) {
        resClient.fail({
          res,
          errMsg: '权限不足，只允许查看自己的博客',
          status: HTTP_STATUS.FORBIDDEN,
        });
      } else {
        blogContent.create_date = moment(
          new Date(blogContent.create_date)
        ).format('YYYY-MM-DD HH:MM:SS');

        resClient.success({
          res,
          data: blogContent,
        });
      }
    } else {
      resClient.fail({
        res,
        errMsg: '博客不存在或被删除',
        status: HTTP_STATUS.NOT_FOUND,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveImg,
  create,
  getBlog,
  getBlgContent,
};
