<script setup>
import TopHeader from "../components/mainbox/TopHeader.vue";
import SideMenu from "../components/mainbox/SideMenu.vue";
</script>

<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container {
  height: 100vh;
  width: 100%;
}

.el-main {
  overflow: auto;
  height: calc(100vh-60px);
}
</style>
