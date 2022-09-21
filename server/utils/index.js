const path = require('path')
const fs = require('fs')

module.exports = {
  /**
   * @description 判断文件夹是否存在 如果不存在则创建文件夹
   */
  checkDirExist (p) {
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p)
    }
  },
  /**
   * @description 格式化日期
   */
  formatDateTime (datetime) {
    const date = new Date(datetime)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    var day = date.getDate()
    day = day >= 10 ? day : '0' + day
    var hour = date.getHours()
    hour = hour >= 10 ? hour : '0' + hour
    var minute = date.getMinutes()
    minute = minute >= 10 ? minute : '0' + minute
    var second = date.getSeconds()
    second = second >= 10 ? second : '0' + second
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  /**
   * @description 文件大小换算为合适的单位
   */
  formatFileSize (size) {
    var value = Number(size)
    if (size && !isNaN(value)) {
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
      var index = 0
      var k = value
      if (value >= 1024) {
        while (k > 1024) {
          k = k / 1024
          index++
        }
      }
      return `${(k).toFixed(2)}${units[index]}`
    }
    return '0'
  }
}