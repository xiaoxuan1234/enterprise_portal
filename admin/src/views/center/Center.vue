<script setup>
import { computed, ref, reactive } from "vue";
import { useMainStore } from "../../store/index";

import axios from "@/util/axios.config";
import { ElMessage } from "element-plus";
import upload from "../../util/upload";
import Upload from "../../components/upload/Upload.vue";
const store = useMainStore();
const avatarUrl = computed(() =>
  store.userInfo.avatar
    ? "http://localhost:3000" + store.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

const { username, gender, introduction, avatar } = store.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});

const userFormRules = reactive({
  username: [
    {
      required: true,
      message: "请输入名字",
      trigger: "blur",
    },
  ],
  gender: [
    {
      required: true,
      message: "请选择性别",
      trigger: "blur",
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入介绍",
      trigger: "blur",
    },
  ],
  avatar: [
    {
      required: true,
      message: "请上传头像",
      trigger: "blur",
    },
  ],
});

const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

//每次选择完图片的回调
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
//更新提交
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await upload("/adminapi/user/upload", userForm);
      if (res.ActionType === "OK") {
        store.changeUserInfo(res.data);
        ElMessage.success("更新成功");
      }
    }
  });
};
</script>

<template>
  <div>
    <el-page-header
      content="个人中心"
      icon=""
      title="企业门户网站管理系统"
    ></el-page-header>
    <el-row :gutter="20" class="el-row">
      <el-col :span="6">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.userInfo.username }}</h3>
          <h5>{{ store.userInfo.role === 1 ? "管理员" : "编辑" }}</h5>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="auto"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                class="m-2"
                placeholder="Select"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="userForm.avatar" @change="handleChange" />
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button type="primary" @click="submitForm()"> 更新 </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-top: 20px;
}
.box-card {
  text-align: center;
}

.el-button {
  margin-left: 75px;
}
</style>
