<template>
  <el-icon :size="30" @click.native="collapseChange">
    <component is="fold" v-show="!isCollapse" />
    <component is="expand" v-show="isCollapse" />
  </el-icon>
</template>

<script setup>
import { useSettingStore } from '@/store/setting.js'
const { collapseChange } = useSettingStore()
const isCollapse = computed(() => useSettingStore().isCollapse)
</script>

<style lang="scss" scoped>
.el-icon {
  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: var(--el-bg-color-page);
  }
}
</style>