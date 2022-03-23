const path = require('path');
const atob = require('atob');
const { writeFile } = require('fs/promises');
const short = require('short-uuid');
const logger = require('../../logger/index');
const resCode = require('../tools/resCode');
const HTTP_STATUS = require('./httpStatus')
const byteSize = require('byte-size')

const mimeTypes = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

function getImageMime(base64Encoded) {
  if (base64Encoded.startsWith('data:')) {
    const found = base64Encoded.match(/data:\S*;base64/g);
    return found && found[0].slice('data:'.length, ';base64'.length * -1);
  } else {
    const prefix = atob(base64Encoded.slice(0, 60));
    const found = prefix.match(
      /(webp)|(png)|(gif)|(svg)|(jpg)|(jpeg)|(pjpeg)|(pjp)|(jfif)/gi
    );
    if (!found) {
      const hex = Buffer.from(base64Encoded, 'base64').toString('hex');
      if (hex.startsWith('ffd8ff')) return mimeTypes.jpeg;
      return null;
    } else {
      const type = found[0].toLocaleLowerCase();
      return mimeTypes[type];
    }
  }
}
async function saveLocal(body) {
  const base64Encoded = body.imgData;
  const mime = getImageMime(base64Encoded);
  const suffix = mime.replace('image/', '.');

  const uid = short.generate(); // 文件名称（随机字符串）
  const file = `/${uid}${suffix}`; // 文件名称
  const basePath = path.resolve(process.cwd(), `./assets/images/`); // 文件存储地址
  const filePath = basePath + file; // 文件存储路径
  const base64Data = base64Encoded.replace(
    new RegExp(`^data:${mime};base64,`),
    ''
  ); // base64数据
  const binaryData = Buffer.from(base64Data, 'base64').toString('binary'); // 二进制数据

  const MAX_BYTE = 1024 * 1024 * 2; // 最大字节（2M）

  if(binaryData.length > MAX_BYTE) {
    const picSizeStr = byteSize(binaryData.length)
    return {
      code: resCode.ERROR,
      status: HTTP_STATUS.BAD_REQUEST,
      error: `图片大小为${picSizeStr}，超过了2MB限制`
    }
  } 


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
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      error,
    };
  }
}

module.exports = {
  saveLocal,
};
