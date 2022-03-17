const shortUid = require('short-uuid').generate;
const UserModel = require('../model/User');

const userSession = async function (req, res, next) {
  if (!req.session.uid) {
    const uid = `U_${shortUid()}`;
    req.session.uid = uid; // 设置session
    await UserModel.add(uid); // 新增用户
  }
  next();
};

module.exports = userSession;
