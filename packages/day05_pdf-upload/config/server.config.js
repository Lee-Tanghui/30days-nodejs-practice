const Joi = require('joi');
const chalk = require('chalk');

const NODE_ENV = process.env.NODE_ENV;
const DB_NAME = process.env.DB_NAME;
const MONGO_URL = process.env.MONGO_URL;
const SESSION_KEY = process.env.SESSION_KEY;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT;

const envConfig = {
  NODE_ENV: NODE_ENV ? NODE_ENV : 'development',
  DB_NAME,
  MONGO_URL,
  SESSION_KEY,
  SESSION_SECRET,
  PORT,
};

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .required()
    .error(() => new Error('请指定NODE_ENV')),
  DB_NAME: Joi.string()
    .required()
    .error(() => new Error('数据库名必填')),
  MONGO_URL: Joi.string()
    .required()
    .error(
      () =>
        new Error(
          '请填入有效的MongoDB连接地址用作mongoose的链接，详情参考：https://mongoosejs.com/docs/connections.html'
        )
    ),
  SESSION_KEY: Joi.string()
    .required()
    .error(() => new Error('请填写SESSION_KEY，用于作为用户cookie的key值')),
  SESSION_SECRET: Joi.string()
    .required()
    .error(() => new Error('请填入有效的SESSION_SECRET，用于加密cookie')),
  PORT: Joi.number()
    .required()
    .error(() => new Error('请填入有效的PORT，用作进程端口号')),
});

const validResult = schema.validate(envConfig);

if (validResult.error) {
  const errorInfo =
    '【无法启动该应用】：.env环境变量设置错误，操作步骤如下：\n请将项目根目录下的.env.default文件修改为.env文件并设置自己的变量，修改完成后重启Node.js进程。错误信息如下：\n' +
    validResult.error.toString();

  console.error(chalk.red(errorInfo));

  process.exit();
}

module.exports = {
  LOCAL_BASE_URL: `http://localhost:${PORT}`, // 本地请求url
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 24 * 30, // 30天
  ...envConfig,
};
