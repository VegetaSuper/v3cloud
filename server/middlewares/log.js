const { log, errLogger, resLogger } = require('../utils/log4js')

// 运行日志
const launchLog = async (ctx, next) => {
  const start = new Date()
  await next()
  const end = new Date() - start
  if (process.env.npm_lifecycle_event === 'prod') {
    resLogger(ctx, end)
  } else {
    log.info(`${ctx.method} ${ctx.url} - ${end}ms`)
  }
}

// 错误日志
const errLog = (err, ctx) => {
  if (process.env.npm_lifecycle_event === 'prod') {
    errLogger(ctx, err)
  } else {
    log.error(`${ctx.method} ${ctx.url} - ${end}ms`)
  }
}

module.exports = {
  launchLog,
  errLog
}