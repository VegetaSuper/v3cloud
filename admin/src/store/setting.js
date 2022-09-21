import { defineStore } from "pinia"

export const useSettingStore = defineStore('setting', () => {
  // 菜单折叠变量
  const isCollapse = ref(false)
  // 切换菜单折叠
  function collapseChange () {
    isCollapse.value = !isCollapse.value
  }

  return {
    isCollapse,
    collapseChange,
  }

})