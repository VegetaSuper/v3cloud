<template>
  <el-container class="h100">
    <appmenu />
    <el-container class="main_container">
      <appheader />
      <appmain />
    </el-container>
  </el-container>
</template>

<script setup>
import appmenu from './AppMenu/index.vue'
import appheader from './AppHeader/index.vue'
import appmain from './AppMain/index.vue'

</script>

<style scoped>
.h100 {
  height: 100%;
}

.main_container {
  flex-wrap: wrap;
}
</style>