import axios from 'axios'
import router from '@/router'
import { GET_TOKEN, REMOVE_TOKEN } from './token'

const BASE_PREFIX = import.meta.env.VITE_APP_BASE_API
// 创建实例
const axiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const token = GET_TOKEN()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data
    }

    return response
  },
  (error) => {
    const { response } = error
    if (response.status === 401) {
      REMOVE_TOKEN()
      return Promise.reject(response.data)
    }
    if (response) {
      ElMessage.error(response.data.msg)
    }

    return Promise.reject(error)
  }
)
const request = {
  get (url, data) {
    return axiosInstance.get(url, { params: data })
  },

  post (url, data) {
    return axiosInstance.post(url, data)
  },

  put (url, data) {
    return axiosInstance.put(url, data)
  },

  delete (url, data) {
    return axiosInstance.delete(url, data)
  },

  upload: (url, file) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

}

export default request
