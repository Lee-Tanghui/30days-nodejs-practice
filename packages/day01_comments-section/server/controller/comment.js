const UserModel = require('../model/User');
const CommentModel = require('../model/Comment');
const RES_CODE = require('../../../@common/resCode');
const { beforeDateFormat } = require('../tools/dateFormat');

const getCommentList = async (req, res, next) => {
  try {
    const { uid } = req.session;
    const data = await CommentModel.getList();
    const user = await UserModel.get(uid);

    const formatData = data.map((comment) => {
      const { likedCommentIds } = user;
      const isMine = comment.uid === uid;

      comment.allowedDelete = isMine;
      comment.liked = likedCommentIds.indexOf(comment.cid) >= 0;
      comment.date = beforeDateFormat(comment.date);

      return comment;
    });

    res.json({
      code: RES_CODE.SUCCESS,
      data: formatData,
    });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const user = await UserModel.get(req.session.uid);
    const { uid, name } = user;
    const { content } = req.body;
    const data = {
      content,
      uid,
      name,
    };
    const modelRes = await CommentModel.add(data);
    if (modelRes) {
      res.json({
        code: RES_CODE.SUCCESS,
      });
    } else {
      res.json({
        code: RES_CODE.ERROR,
        errMsg: '留言失败',
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { cid } = req.query;
    const modelRes = await CommentModel.delete(cid);
    if (modelRes.deletedCount) {
      res.json({
        code: RES_CODE.SUCCESS,
      });
    } else {
      res.json({
        code: RES_CODE.ERROR,
        errMsg: '删除失败',
      });
    }
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getCommentList,
  addComment,
  deleteComment,
};
