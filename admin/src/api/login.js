import request from '@/utils/request.js'

export function register (data) {
  return request.post('/register', data)
}

export function login (data) {
  return request.get('/login', data)
}

