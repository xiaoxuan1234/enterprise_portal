<script setup>
import { useMainStore } from "../../store";
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useMainStore();

const vAdmin = {
  mounted(el) {
    if (store.userInfo.role !== 1) {
      el.parentNode.removeChild(el);
    }
  },
};
</script>

<template>
  <el-aside :width="store.isCollapsed ? '64px' : '200px'">
    <el-menu
      :collapse="store.isCollapsed"
      :router="true"
      :default-active="route.fullPath"
      :collapse-transition="false"
    >
      <el-menu-item index="/index">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon><Avatar /></el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user" v-admin>
        <template #title>
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user/add">添加用户</el-menu-item>
        <el-menu-item index="/user/list">添加列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news">
        <template #title>
          <el-icon><MessageBox /></el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news/add">创建新闻</el-menu-item>
        <el-menu-item index="/news/list">新闻列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product">
        <template #title>
          <el-icon><Reading /></el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product/add">添加产品</el-menu-item>
        <el-menu-item index="/product/list">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.el-aside {
  height: 100vh;
}

.el-menu {
  height: 100vh;
}
</style>
