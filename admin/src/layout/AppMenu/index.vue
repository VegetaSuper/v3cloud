<template>
  <el-aside :width="isCollapse ? '65px' : '200px'">
    <el-scrollbar>
      <el-menu router :collapse="isCollapse" :default-active="router.currentRoute.value.path" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b">
        <NavMenuItem v-for="(item, index) in menuList" :key="index" :item="item">
        </NavMenuItem>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import menuList from './menu'
import router from '@/router'
import NavMenuItem from './NavMenuItem.vue'
import { useSettingStore } from '@/store/setting.js'
const isCollapse = computed(() => useSettingStore().isCollapse)

</script>

<style lang="scss" scoped>
.el-aside {
  height: 100%;
  box-shadow: var(--el-box-shadow);
  transition: all .3s;
  overflow-x: hidden;
  background-color: #545c64;
}

.el-menu {
  border-right: none;
}
</style>