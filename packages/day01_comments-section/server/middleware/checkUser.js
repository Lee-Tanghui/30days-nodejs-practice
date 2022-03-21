const HTTP_STATUS = require('../../../@common/httpStatus');
const RES_CODE = require('../../../@common/resCode');
const CommentModel = require('../model/Comment');
const resClient = require('../tools/resClient');

const checkUser = async function (req, res, next) {
  const { uid } = req.session;
  const { cid } = req.query;

  const comment = await CommentModel.getByCid(cid);
  if (comment && comment.uid !== uid) {
    resClient.fail({
      res,
      errMsg: '权限不足，非作者不允许删除留言',
      status: HTTP_STATUS.FORBIDDEN,
    });
  } else {
    next();
  }
};

module.exports = checkUser;
