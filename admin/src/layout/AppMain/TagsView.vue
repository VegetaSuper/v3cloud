<script setup>
// 右键菜单组件
import { CustomMouseMenu } from '@howdyjs/mouse-menu'

import router from '@/router'
import { useTagsviewStore } from '@/store/tagsview.js'
const {
  tags,
  reload,
  removeTag,
  removeOtherTag,
  removeLeftTag,
  removeRightTag
} = useTagsviewStore()

// 右键菜单配置
const showMenu = (tag, e) => {
  e.preventDefault()
  const MouseMenuCtx = CustomMouseMenu({
    el: e,
    menuWrapperCss: {
      padding: '0 0',
      background: '#fff'
    },
    menuItemCss: {
      hoverLabelColor: '#409EFF',
    },
    menuList: [
      {
        label: '重新加载',
        fn: () => reload()
      },
      {
        label: '关闭其他',
        fn: () => removeOtherTag(tag.path),
        disabled: () => tags.length == 1
      },
      {
        label: '关闭左侧',
        fn: () => removeLeftTag(tag.path),
        disabled: () => tags.length == 1
      },
      {
        label: '关闭右侧',
        fn: () => removeRightTag(tag.path),
        disabled: () => tags.length == 1
      }
    ]
  })
  const { x, y } = e
  MouseMenuCtx.show(x, y)
}

</script>
  
<template>
  <el-scrollbar class="tagsViewScrollbar">
    <div class="tag_container">
      <div v-for="item in tags" :key="item.path" class="tag_item"
        :class="router.currentRoute.value.path === item.path ? 'current_tag' : ''" @click="router.push(item.path)"
        @contextmenu.prevent.native="showMenu(item, $event)">
        <span>{{ item.title }}</span>
        <el-icon class="close_icon" @click.stop.native="removeTag(item.path)" v-if="tags.length > 1">
          <component is="close"></component>
        </el-icon>
      </div>
    </div>
  </el-scrollbar>
</template>
  
<style lang="scss" scoped>
.tagsViewScrollbar {
  height: 40px;
}

.tag_container {
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: var(--el-color-info-light-9);
}

.tag_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  width: 150px;
  cursor: pointer;
  font-size: 14px;
  color: var(--el-color-info);

  &:hover {
    color: var(--el-text-color-primary);
  }
}

.current_tag {
  background-color: #fff;
  border-bottom: 2px solid var(--el-color-primary);
  color: var(--el-text-color-primary);
}

.close_icon {
  padding: 3px;
  border-radius: 50%;
  background-color: transparent;

  &:hover {
    background-color: var(--el-color-info-light-7);
  }
}
</style>