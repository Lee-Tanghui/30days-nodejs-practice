const path = require('path');
const { writeFile } = require('fs/promises');
const short = require('short-uuid');
const logger = require('../../logger/index');
const resCode = require('../tools/resCode');

module.exports = {
  async saveLocal(body) {
    const FILE_SUFFIX = '.png'; // 文件后缀
    const uid = short.generate(); // 文件名称（随机数字）
    const file = `/${uid}${FILE_SUFFIX}`; // 文件名称
    const basePath = path.resolve(process.cwd(), `./assets/images/`); // 文件存储地址
    const filePath = basePath + file; // 文件存储路径

    const base64Data = body.imgData.replace(/^data:image\/jpeg;base64,/, ''); // base64数据
    const binaryData = Buffer.from(base64Data, 'base64').toString('binary'); // 二进制数据

    try {
      await writeFile(filePath, binaryData, 'binary');
      return {
        code: resCode.SUCCESS,
        data: `/images${file}`,
      };
    } catch (error) {
      logger.error(error);
      return {
        code: resCode.ERROR,
        error,
      };
    }
  },
};
