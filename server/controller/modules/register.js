const bcrypt = require('bcrypt')
const { mysql } = require('../../lib/mysql')

// 注册
const register = async (ctx) => {
  let { username, password, mobile } = ctx.request.body

  try {
    // 检查用户名或密码是否为空
    if (!username || !password) {
      ctx.status = 400
      ctx.body = {
        msg: '用户名或密码不能为空!',
      }
      return
    }

    // 密码加密
    password = await bcrypt.hash(password, 5)

    // 检查是否存在该用户名
    const isUser = await mysql('user').where({ username }).select()
    if (isUser.length) {
      ctx.status = 406
      ctx.body = {
        msg: '用户名已存在'
      }
      return
    }

    // 表中加入新用户
    await mysql('user').insert({
      'username': username,
      'password': password,
      'mobile': mobile
    })

    ctx.body = {
      status: 200,
      msg: '注册成功，请登录'
    }

  } catch (error) {
    ctx.status = 500
    ctx.body = {
      msg: '注册失败，请联系管理员'
    }
  }

}

module.exports = register