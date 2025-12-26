<script setup>
import { ref, reactive, onMounted } from "vue";
import upload from "../../util/upload";
import Upload from "../../components/upload/Upload.vue";
import { useRouter, useRoute } from "vue-router";
import axios from "@/util/axios.config";
const productFormRef = ref();
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
});

const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};

const productFormRules = reactive({
  title: [
    {
      required: true,
      message: "请输入产品名字",
      trigger: "blur",
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入简要描述",
      trigger: "blur",
    },
  ],
  detail: [
    {
      required: true,
      message: "请输入详细描述",
      trigger: "blur",
    },
  ],
  cover: [
    {
      required: true,
      message: "请上传产品图片",
      trigger: "blur",
    },
  ],
});

const router = useRouter();
const route = useRoute();
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/product/list", productForm);
      router.push(`/product/list`);
    }
  });
};

const handleBack = () => {
  router.back();
};

onMounted(() => {
  getData();
});

const getData = async () => {
  const res = await axios.get(`/adminapi/product/list/${route.params.id}`);
  const data = res.data.data;
  Object.assign(productForm, data);
  if (data.cover) {
    productForm.cover = "http://localhost:3000" + data.cover;
  }
};
</script>

<template>
  <div>
    <el-page-header
      content="编辑产品"
      @back="handleBack()"
      title="产品管理"
    ></el-page-header>

    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="80px"
      class="ruleForm"
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @change="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 更新产品 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.ruleForm {
  margin-top: 50px;
}
</style>
