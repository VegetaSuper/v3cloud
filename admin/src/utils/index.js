export default {
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
  // 文件大小换算
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
  },
  // 后缀判断
  suffixMethod (fileName, strFilter) {
    if (fileName.indexOf('.') > -1) {
      var p = fileName.lastIndexOf('.')
      var strPostfix = fileName.substring(p, fileName.length) + '|'
      strPostfix = strPostfix.toLowerCase()
      if (strFilter.indexOf(strPostfix) > -1) {
        return true
      }
    }
    return false
  },
  //判断图片
  isPicture (fileName) {
    var strFilter = '.jpeg|.jpg|.jfif|.png|.bmp|.pic|.svg|.gif|'
    return this.suffixMethod(fileName, strFilter)
  },
  // 判断文档
  isDocument (fileName) {
    var strFilter = '.pdf|.txt|.ppt|.docx|.doc|.xlsx|.xls|'
    return this.suffixMethod(fileName, strFilter)
  },
  //判断音频
  isAudio (fileName) {
    var strFilter = '.mpeg|.rm|.ram|.swf|.mp3|.wma|.rm|'
    return this.suffixMethod(fileName, strFilter)
  },
  //判断视频
  isVideo (fileName) {
    var strFilter = '.mp4|.m2v|.mkv|.rmvb|.wmv|.avi|.flv|.mov|.m4v|.mpg|'
    return this.suffixMethod(fileName, strFilter)
  },

} 