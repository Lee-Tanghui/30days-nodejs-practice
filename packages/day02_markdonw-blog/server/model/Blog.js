const mongoose = require('mongoose');
const shortUid = require('short-uuid').generate;
const { Schema } = mongoose;

const BlogSchema = new Schema({
  // 博客id
  bid: {
    type: String,
    required: true,
  },
  // 用户id
  uid: {
    type: String,
    required: true,
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
   * @returns 
   */
  async get(uid) {
    return await this.find({ uid }, { _id: 0, __v: 0, uid: 0 })
      .sort({ create_date: -1 })
      .limit(10)
      .lean();
  },
};

module.exports = mongoose.model('blog', BlogSchema);
