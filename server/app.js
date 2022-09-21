const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const jwtKoa = require('koa-jwt')
const path = require('path')
const static = require('koa-static')


// 配置
const config = require('./lib/config')
// 中间件
const tokenCheck = require('./middlewares/tokenCheck')
const { launchLog, errLog } = require('./middlewares/log')
const router = require('./router/index')

const app = new Koa()
app
  .use(static(path.join(__dirname))) // 静态资源
  .use(bodyParser()) // 请求头解析
  .use(cors(config.cors_config)) // 跨域
  .use(tokenCheck) // 检查token有效
  .use(jwtKoa({ secret: config.secret }).unless({
    path: config.unless_path
  })) // token正确性验证 & 过滤
  .use(koaBody(config.upload)) // 上传
  .use(launchLog) // 日志
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', errLog)

// 定时任务
// const { update_file_sql } = require('./schedule/file')
// update_file_sql()


app.listen(config.port, () => {
  console.log('server is running http://127.0.0.1:' + config.port)
})
