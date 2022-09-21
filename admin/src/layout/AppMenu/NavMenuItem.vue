<template>
  <!-- 无子菜单 -->
  <el-menu-item v-if="!item.children" :index="item.path">
    <el-icon v-if="item.icon">
      <component :is="item.icon"></component>
    </el-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>
  <!-- 存在子菜单 -->
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon v-if="item.icon">
        <component :is="item.icon"></component>
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <NavMenuItem v-for="(subItem, index) in item.children" :key="index" :item="subItem">
    </NavMenuItem>
  </el-sub-menu>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>

</style>