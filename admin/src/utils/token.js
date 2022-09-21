import router from '@/router'

export function SET_TOKEN (token) {
  sessionStorage.setItem('token', token)
}

export function GET_TOKEN () {
  return sessionStorage.getItem('token')
}

export function REMOVE_TOKEN () {
  sessionStorage.removeItem('token')
  router.push('/login')
}

