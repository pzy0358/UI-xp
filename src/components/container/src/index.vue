<template>
  <el-container>
    <el-aside width="auto">
      <nav-side :collapse="collapse"></nav-side>
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="collapse"></nav-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NavSide from "./navSide/index.vue";
import NavHeader from "./navHeader/index.vue";

// 控制菜单栏展开与收起
const collapse = ref(false);
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
