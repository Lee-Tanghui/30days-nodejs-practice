const shortUid = require('short-uuid').generate;

const userSession = async function (req, res, next) {
  if (!req.session.uid) {
    const uid = `U_${shortUid()}`;
    req.session.uid = uid; // 设置session
  }
  next();
};

module.exports = userSession;
