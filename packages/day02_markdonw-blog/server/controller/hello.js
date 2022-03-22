const resClient = require('../tools/resClient');

const getHello = async (req, res, next) => {
  try {
    resClient.success({
      res,
      data: 'hello, welcome to your new Node.js project🚀🚀🚀',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHello,
};
