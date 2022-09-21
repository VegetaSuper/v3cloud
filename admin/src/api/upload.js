import request from '@/utils/request.js'

export function upload (file) {
  return request.upload('/file/upload', file)
}

export function getFiles () {
  return request.get('/file/getFiles')
}