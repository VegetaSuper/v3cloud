import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '控制台'
        }
      },
      {
        path: '/file/:category',
        name: 'File',
        component: () => import('@/views/file/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const token = sessionStorage.getItem('token')
  if (!token && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

export default router