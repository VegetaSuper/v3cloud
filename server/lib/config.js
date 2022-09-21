const path = require('path')

const config = {
  port: 3000,
  secret: 'secret',
  mysql: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'v3database'
  },
  cors_config: {
    origin: function (ctx) {
      return "*" // 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  },
  upload: {
    multipart: true, // 支持多文件上传
    encoding: 'gzip',
    baseUri: 'public/upload',
    formidable: {
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize: 20 * 1024 * 1024, // 文件上传大小限制 20M
    }
  },
  unless_path: [
    /\/register/,
    /\/login/
  ],
  tencent_cos: { // 腾讯云存储相关参数
    Bucket: 'fufuciel-1304211740', // 存储桶
    Region: 'ap-nanjing', // 所在区
    SecretId: 'AKIDIRPCoESUBi195oKey61jGbkgRzLWXN0R',
    SecretKey: 'HOJ3Zt11pSt790eIm23oJZaLr79vSjlY',
    durationSeconds: 1800, // 有效期
  }
}

module.exports = config