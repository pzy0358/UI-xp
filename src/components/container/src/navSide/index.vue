<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="collapse"
    router
  >
    <el-menu-item index="/">
      <el-icon><el-icon-aim /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/chooseIcon">
      <el-icon><el-icon-flag /></el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="/chooseArea">
      <el-icon><el-icon-addlocation /></el-icon>
      <span>省市区选择</span>
    </el-menu-item>
    <el-menu-item index="/form">
      <el-icon><el-icon-documentcopy /></el-icon>
      <span>表单</span>
    </el-menu-item>
    <el-menu-item index="/table">
      <el-icon><el-icon-creditcard/></el-icon>
      <span>表格</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
let props = defineProps<{
  collapse: boolean;
}>();
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
