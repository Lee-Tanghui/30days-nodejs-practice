const mongoose = require('mongoose');
const shortUid = require('short-uuid').generate;
const { Schema } = mongoose;

const BlogSchema = new Schema({
  // 博客id
  bid: {
    type: String,
    required: true,
    index: true,
  },
  // 用户id
  uid: {
    type: String,
    required: true,
    index: true,
  },
  // 标题
  title: {
    type: String,
    required: '',
  },
  // 内容
  content: {
    type: String,
    required: true,
  },
  // 创建日期
  create_date: {
    type: String,
    required: true,
    index: {
      expires: 60 * 60 * 24, // 24小时过期删除
    }
  },
});

BlogSchema.statics = {
  /**
   * @desc 新增博客
   * @param {String} param.uid 用户id
   * @param {String} param.title 博客标题
   * @param {String} param.content 博客内容
   * @returns Blog
   */
  async add({ uid, title, content }) {
    const blogData = {
      bid: shortUid(),
      uid,
      title,
      content,
      create_date: new Date(),
    };

    return await this.create(blogData);
  },
  /**
   * @desc 查询某用户的博客列表
   * @param {String} uid 用户id
   * @param {Number} page 当前页码
   * @param {Number} pageSize 每页条数
   * @returns
   */
  async get({ uid, page, pageSize }) {
    return await this.find({ uid }, { _id: 0, __v: 0, uid: 0 })
      .sort({ create_date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();
  },
  /**
   * @desc 获取某用户的博客的总条数
   */
  async getCount(uid) {
    return await this.find({ uid }).count();
  },
  /**
   * @desc 获取博客内容
   * @param {String} param.bid 博客id
   */
  async getBlogContent(bid) {
    return await this.findOne({ bid }, { _id: 0, __v: 0 }).lean();
  },
};

module.exports = mongoose.model('blog', BlogSchema);
