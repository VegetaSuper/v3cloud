import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import * as Elicons from '@element-plus/icons-vue'
import utils from '@/utils'
import '@/assets/style/base.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$utils = utils

Object.keys(Elicons).forEach(key => {
  app.component(key, Elicons[key])
})

app.use(pinia).use(router).mount('#app')
