const HTTP_STATUS = require('../../../@common/httpStatus');
const RES_CODE = require('../../../@common/resCode');
const CommentModel = require('../model/Comment');

const checkUser = async function (req, res, next) {
  const { uid } = req.session;
  const { cid } = req.query;

  const comment = await CommentModel.getByCid(cid);
  if (comment && comment.uid !== uid) {
    res.status(HTTP_STATUS.FORBIDDEN).json({
      code: RES_CODE.ERROR,
      errMsg: '权限不足，非作者不允许删除留言',
    });
  } else {
    next();
  }
};

module.exports = checkUser;
