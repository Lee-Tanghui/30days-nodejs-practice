const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentModel = require('./Comment')

const UserSchema = new Schema({
  // 用户id
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  // 用户的名称
  name: {
    type: String,
    required: true,
  },
  // 喜欢的评论Id列表
  likedCommentIds: {
    type: Array,
    default: [],
  },
});

UserSchema.statics = {
  /**
   * @desc 根据uid新增用户
   * @param {String} uid 用户id
   * @returns User
   */
  async add(uid) {
    const data = { uid, name: `用户_${uid.slice(-6)}`, likedCommentIds: [] };
    return await this.create(data);
  },
  /**
   * @desc 根据uid获取用户
   * @param {String} uid  用户id
   * @returns User
   */
  async get(uid) {
    const data = await this.findOne({ uid }, { _id: 0, __v: 0 }).lean();
    return data;
  },
  /**
   * @desc 点击喜欢
   * @param {String} param.cid 评论id
   * @param {String} param.uid 用户id
   * @returns // -1为取消点赞，1为点赞
   */
  async toggleLike({ cid, uid }) {
    const user = await this.get(uid);
    const { likedCommentIds } = user;
    const isLiked = likedCommentIds.includes(cid);
    const num = isLiked ? -1 : 1
    if (isLiked) {
      await this.updateOne({ uid }, { $pull: { likedCommentIds: cid } });
    } else {
      await this.updateOne({ uid }, { $addToSet: { likedCommentIds: cid } });
    }
    await CommentModel.like({ cid, num })

    return num;
  },
};

module.exports = mongoose.model('user', UserSchema);
