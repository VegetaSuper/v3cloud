const bcrypt = require('bcrypt')
const { mysql } = require('../../lib/mysql')
const config = require('../../lib/config')
const jsonwebtoken = require('jsonwebtoken')

// 登录
const login = async (ctx) => {
  let { username, password } = ctx.query

  try {
    // 检查用户名或密码是否为空
    if (!username || !password) {
      ctx.status = 400
      ctx.body = {
        msg: '用户名或密码不能为空!',
      }
      return
    }


    // 检查用户名
    const user = await mysql('user').where({ username }).select()
    if (!user.length) {
      ctx.status = 400
      ctx.body = {
        msg: '用户不存在或用户名错误'
      }
      return
    }

    // 检查密码
    const isPwd = await bcrypt.compare(password, user[0].password)
    if (!isPwd) {
      ctx.status = 400
      ctx.body = {
        msg: '密码错误',
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      msg: '登录成功',
      // user: user[0],
      // 生成 token 返回给客户端
      token: jsonwebtoken.sign({
        data: user[0],
        // 设置 token 过期时间
        // exp: Math.floor(Date.now() / 1000) + (60 * 60),
      }, config.secret),
    }

  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.body = {
      msg: '登录失败，请联系管理员'
    }
  }

}

module.exports = login