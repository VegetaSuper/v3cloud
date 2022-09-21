import { defineStore } from "pinia"
import router from '@/router'

export const useTagsviewStore = defineStore('tagsview', () => {
  const isRouterAlive = ref(true)
  const tags = reactive([])

  // 重新加载appmain
  function reload () {
    isRouterAlive.value = false
    nextTick(() => {
      console.log('重新加载了...')

      isRouterAlive.value = true
    })
  }

  // 添加tag
  function addTag (current) {
    const existItem = tags.find(item => item.path === current.path)
    if (!existItem && !current.meta.hidden) {
      tags.push({
        path: current.path,
        name: current.name,
        title: current.meta.title,
      })
    }
  }

  // 移除tag
  function removeTag (path) {
    const index = tags.findIndex(item => item.path === path)
    // 当前路由需要跳转至相邻路由
    if (path === router.currentRoute.value.path) {
      if (index > 0) {
        router.push(tags[index - 1].path)
      } else {
        router.push(tags[index + 1].path)
      }
    }
    tags.splice(index, 1)
  }

  // 关闭其他
  function removeOtherTag (path) {
    const current = tags.find(item => item.path === path)
    tags.splice(0, tags.length)
    tags.push(current)
    router.push(current.path)
  }

  // 关闭左侧
  function removeLeftTag (path) {
    const index = tags.findIndex(item => item.path === path)
    tags.splice(0, index)
  }

  // 关闭右侧
  function removeRightTag (path) {
    const index = tags.findIndex(item => item.path === path)
    tags.splice(index + 1, tags.length)
  }

  // 监听路由的变化
  watch(
    () => router.currentRoute.value,
    (newValue, oldValue) => {
      addTag(newValue)
    },
    { immediate: true }
  )

  return {
    isRouterAlive,
    reload,
    tags,
    addTag,
    removeTag,
    removeOtherTag,
    removeLeftTag,
    removeRightTag
  }

})