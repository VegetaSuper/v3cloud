import { defineStore } from "pinia"

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = reactive({
    userId: '',
    username: '',
    mobile: ''
  })
  // 切换菜单折叠
  function collapseChange () {
    isCollapse.value = !isCollapse.value
  }

  function login () {

  }

  return {
    isCollapse,
    collapseChange,
  }

})