const { createLogger, format, transports } = require('winston');
const { json, combine, timestamp, printf, errors } = format;
const pkg = require('../package.json');

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), myFormat, json()),
  defaultMeta: { service: pkg.name },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }), // 错误日志将存储在error.log上面
    new transports.File({ filename: 'combined.log' }), // 所有的日志的日志都将存储在combined.log上面
  ],
});

// 捕获全局的excepetion错误
logger.exceptions.handle(
  new transports.File({ filename: 'exceptions.log', level: 'error' })
);

// 捕获全局的rejection错误
logger.rejections.handle(new transports.File({ filename: 'rejections.log', level: 'error' }));

module.exports = logger;
