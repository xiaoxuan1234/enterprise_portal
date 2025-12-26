<script setup>
import { ref, reactive } from "vue";
import Editor from "../../components/editor/Editor.vue";
import upload from "../../util/upload";
import Upload from "../../components/upload/Upload.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1,
  cover: "",
  file: null,
  isPublish: 0,
});

const validateContent = (rule, value, callback) => {
  // 去掉空标签后检查是否有内容
  const text = value.replace(/<[^>]+>/g, "").trim();
  if (!text) {
    callback(new Error("请输入内容"));
  } else {
    callback();
  }
};

const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, validator: validateContent, trigger: "change" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }],
});

const handleChange = (data) => {
  newsForm.content = data;
};

const options = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知通告",
    value: 3,
  },
];

const handleUploadChange = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};

const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/news/add", newsForm);
      router.push("/news/list");
    }
  });
};
</script>

<template>
  <div>
    <el-page-header
      content="创建新闻"
      icon=""
      title="新闻管理"
    ></el-page-header>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="80px"
      class="ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <editor v-model="newsForm.content" />
      </el-form-item>
      <el-form-item label="列表" prop="category">
        <el-select
          v-model="newsForm.category"
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
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @change="handleUploadChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 添加新闻 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form {
  margin-top: 50px;
}
</style>
