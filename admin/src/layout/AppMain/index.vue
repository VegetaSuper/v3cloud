<template>
  <el-main>
    <!-- <tagsview /> -->
    <el-scrollbar>
      <router-view v-if="useTagsviewStore().isRouterAlive"></router-view>
    </el-scrollbar>
  </el-main>
</template>

<script setup>
// import tagsview from './TagsView.vue'
import { useTagsviewStore } from '@/store/tagsview.js'

</script>

<style scoped>
.el-main {
  padding: 0;
  height: calc(100% - 50px);
}
</style>