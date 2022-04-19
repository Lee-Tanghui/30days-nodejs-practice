const mongoose = require('mongoose');
const stream = require('stream');
const chalk = require('chalk');
const logger = require('../../logger');
const config = require('../../config/server.config');
const mongoUrl = config.MONGO_URL;
const ImagesFiles = require('../model/ImagesFiles');
const suffix = require('file-suffix');

/**
 * Node.js MongoDB Driver API:
 *  - https://mongodb.github.io/node-mongodb-native/2.2/api/GridFSBucket.html
 * tutorial:
 *  - https://edupeeth.com/all-courses/nodejs/mongodb-gridfs-bucket
 */
const GRID_FS_BUCKET_NAME = 'images';
const FILES_COLL = `${GRID_FS_BUCKET_NAME}.files`;
const CHUNKS_COLL = `${GRID_FS_BUCKET_NAME}.chunks`;
let gfsBucket = null;

module.exports = {
  async connect() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongoUrl, {
          useNewUrlParser: true,
        })
        .then(() => {
          gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: GRID_FS_BUCKET_NAME,
            chunkSizeBytes: 1 * 1024 * 1024, // 设置chunk长度为1M
          });
          config.NODE_ENV === 'development' &&
            console.log(
              chalk.green(`✅MongoDB Connected to ${config.DB_NAME}`)
            );
          resolve();
        })
        .catch((err) => {
          logger.error(err);
          reject(err);
        });
    });
  },
  GridFS: {
    GRID_FS_BUCKET_NAME,
    FILES_COLL,
    CHUNKS_COLL,
  },
  /**
   * @desc 根据id获取图片的base64数据
   * @param {String} id 
   * @returns 
   */
  downloadImageById(id) {
    return new Promise(async (resolve) => {
      let file = await ImagesFiles.getById(id);
      if (!file) {
        resolve(null);
      } else {
        const fileSuffix = suffix(file.filename);
        const  bufferList = []
        gfsBucket
          .openDownloadStream(mongoose.Types.ObjectId(id))
          .on('data', (data) => {
            bufferList.push(data)
          })
          .on('end', () => {
            const base64 = Buffer.concat(bufferList).toString('base64')
            let data = `data:image/${fileSuffix};base64,` + base64
            resolve(data)
          })
          .on('error', (error) => {
            throw error;
          });
      }
    });
  },
  /**
   * @desc 上传图片Buffer数据
   * @param {Buffer} data 
   * @param {String} fileName 
   * @returns 
   */
  uploadBufferToGFS(data, fileName) {
    if (!Buffer.isBuffer(data)) {
      throw TypeError('data should be Buffer Type');
    }
    return new Promise((resolve, reject) => {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(Buffer.from(data));
      bufferStream
        .pipe(gfsBucket.openUploadStream(fileName))
        .on('finish', () => {
          resolve();
        })
        .on('error', (error) => {
          throw error;
        });
    });
  },
};
