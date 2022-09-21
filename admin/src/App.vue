<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const config = reactive({
  autoInsertSpace: true
})
</script>

<template>
  <el-config-provider :button="config" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
