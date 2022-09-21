const jsonwebtoken = require('jsonwebtoken')
const config = require('../lib/config')

const tokenCheck = (ctx, next) => {
  return next().catch((err) => {
    if (ctx.header && ctx.header.authorization) {
      const parts = ctx.header.authorization.split(' ')
      if (parts.length === 2) {
        const scheme = parts[0]
        const token = parts[1]
        if (/^Bearer$/i.test(scheme)) {
          try {
            // 校验token是否有效
            jsonwebtoken.verify(token, config.secret, {
              complete: true
            })
          } catch (error) {
            ctx.status = 401
            ctx.body = {
              msg: '令牌已过期'
            }
          }
        }
      }
    }
  })

}

module.exports = tokenCheck