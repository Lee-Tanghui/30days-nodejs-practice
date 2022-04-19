const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ImagesFilesSchema = new Schema({
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  filename: String,
});

ImagesFilesSchema.statics = {
  /**
   * @desc 获取图片列表（一页12项）
   * @param {Number} page
   * @returns ImagesFilesSchema[]
   */
  async getList(page = 1) {
    const PAGE_SIZE = 12;
    return await this.find({}, { length: 0, chunkSize: 0 })
      .sort({ uploadDate: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);
  },
  async getById(id) {
    return await this.findOne({ _id: id });
  },
};

module.exports = mongoose.model('images.files', ImagesFilesSchema);
