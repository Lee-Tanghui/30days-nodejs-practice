const UserModel = require('../model/User');
const CommentModel = require('../model/Comment');
const HTTP_STATUS = require('../../../@common/httpStatus');
const RES_CODE = require('../../../@common/resCode');
const { beforeDateFormat } = require('../tools/dateFormat')

const getCommentList = async (req, res) => {
  try {
    const { uid } = req.session;
    const data = await CommentModel.getList();
    const user = await UserModel.get(uid);

    const formatData = data.map((comment) => {
      const { likedCommentIds } = user
      const isMine = comment.uid === uid;
      
      comment.allowedDelete = isMine;
      comment.liked = likedCommentIds.indexOf(comment.cid) >= 0;
      comment.date = beforeDateFormat(comment.date)

      return comment;
    });

    res.json({
      code: RES_CODE.SUCCESS,
      data: formatData,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RES_CODE.ERROR,
      errMsg: RES_CODE.INNER_ERROR,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const user = await UserModel.get(req.session.uid);
    const { uid, name } = user;
    const { content } = req.body;
    const data = {
      content,
      uid,
      name,
    };
    await CommentModel.add(data);
    res.json({
      code: RES_CODE.SUCCESS,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RES_CODE.ERROR,
      errMsg: RES_CODE.INNER_ERROR,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { cid } = req.query
    const delResult = await CommentModel.delete(cid)
    res.json({
      code: RES_CODE.SUCCESS,
      data: delResult
    })
    
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      code: RES_CODE.ERROR,
      errMsg: RES_CODE.INNER_ERROR,
    });
  }
}

module.exports = {
  getCommentList,
  addComment,
  deleteComment
};
