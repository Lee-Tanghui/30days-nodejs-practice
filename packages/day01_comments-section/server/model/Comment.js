const mongoose = require('mongoose');
const shortUid = require('short-uuid').generate;
const { Schema } = mongoose;

const CommentSchema = new Schema({
  // 评论id
  cid: {
    type: String,
    required: true,
    unique: true,
  },
  // 用户id
  uid: {
    type: String,
    required: true,
  },
  // 用户名称
  name: {
    type: String,
    required: true,
  },
  // 评论内容
  content: {
    type: String,
    required: true,
  },
  // 日期
  date: {
    type: Date,
    required: true,
    default: new Date(),
    index: {
      expires: 60 * 60 * 2, // 2小时过期删除
    },
  },
  // 喜欢的数量
  like: {
    type: Number,
    default: 0,
  },
});

CommentSchema.statics = {
  /**
   * @desc 获取留言（最新的20条）
   * @returns Comment[]
   */
  async getList() {
    const data = await this.find({}, { __v: 0, _id: 0 })
      .sort({ date: -1 })
      .limit(20).lean();
    return data;
  },
  /**
   * @desc 新增留言
   * @param {String} param.content 留言内容 
   * @param {String} param.uid 用户id
   * @param {String} param.name 用户姓名
   * @returns Comment
   */
  async add({ content, uid, name }) {
    const data = {
      cid: `C_${shortUid()}`,
      uid,
      name,
      content,
      date: new Date(),
      like: 0,
    };

    return await this.create(data);
  },
  /**
   * 
   * @param {String} param.cid 评论id
   * @param {Number} parma.num +1或-1
   * @returns 
   */
  async like({cid, num}) {
    return await this.updateOne(
      { cid },
      { $inc: { like: num } }
    )
  },
  async delete(cid) {
    return await this.deleteOne({ cid })
  },
  async getByCid(cid) {
    return await this.findOne({ cid }).lean()
  }
};

module.exports = mongoose.model('comment', CommentSchema);
