<template>
  <el-header>
    <collapseBtn />
  </el-header>
</template>

<script setup>
import collapseBtn from './collapseBtn.vue'
</script>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid var(--el-border-color);
}
</style>