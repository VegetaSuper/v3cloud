const fs = require('fs')
const pathSrc = require('path')

const { mysql } = require('../../lib/mysql')
const config = require('../../lib/config')
const { baseUri, formidable } = config.upload
const { checkDirExist, formatDateTime, formatFileSize } = require('../../utils/index')

// 上传
const upload = async (ctx) => {
  try {
    // 额外路径
    const folder = ctx.request.body.folder
    const { size, filepath, originalFilename, lastModifiedDate } = ctx.request.files.file
    if (size > formidable.maxFieldsSize) { // 判断文件大小是否合法
      ctx.status = 400
      ctx.body = {
        msg: `上传文件大小不能超过${formatFileSize(formidable.maxFieldsSize)}`
      }
      return
    }
    // 创建可读流
    const reader = fs.createReadStream(filepath)
    // 获取上传文件扩展名
    const ext = originalFilename.split('.').pop()
    // 文件路径
    let path = `${baseUri}/${originalFilename}`
    if (folder) {
      checkDirExist(pathSrc.join(__dirname, `../../${baseUri}/${folder}`))
      path = `${baseUri}/${folder}/${originalFilename}`
    }

    const fileList = await mysql('file').where({ name: originalFilename, path }).select()

    if (fileList.length > 0) { // 同名替换
      mysql('file').update({
        'modify_time': formatDateTime(lastModifiedDate),
        'size': size,
      }).where({ file_id: fileList[0].file_id }).then(result => {

        fs.unlink(path, (err) => {
          if (err) throw err
          const upStream = fs.createWriteStream(path)
          reader.pipe(upStream)
        })

      }).catch(error => {
        console.log('error::' + error)
      })
    } else { // 表中插入附件记录
      mysql('file').insert({
        'name': originalFilename,
        'path': path,
        'modify_time': formatDateTime(lastModifiedDate),
        'size': size,
        'ext': ext
      }).then(result => {
        // 创建可写流
        const upStream = fs.createWriteStream(path)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
      }).catch(error => {
        console.log('error::' + error)
      })
    }

    ctx.body = {
      msg: '上传成功'
    }

  } catch (error) {
    console.log('error::' + error)

    ctx.status = 500
    ctx.body = {
      msg: '操作失败'
    }
  }

}

module.exports = {
  upload
}