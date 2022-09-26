const router = require('koa-router')()
const controller = require('../controller/index.js')

// 注册
router.post('/register', controller.register)
// 登录
router.get('/login', controller.login)

// 查看附件
router.get('/file/getFiles', controller.file.getFiles)
// 上传
router.post('/file/upload', controller.file.upload)

module.exports = router