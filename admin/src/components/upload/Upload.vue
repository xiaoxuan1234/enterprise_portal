<script setup>
import { defineEmits, defineProps, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps({
  avatar: String,
});

const emit = defineEmits(["change"]);
//每次选择完图片的回调
const handleChange = (file) => {
  emit("change", file.raw);
};

const uploadAvatr = computed(() => {
  if (!props.avatar) return "";
  // 如果已经是完整URL（blob或http开头），直接返回
  if (props.avatar.startsWith("blob:") || props.avatar.startsWith("http")) {
    return props.avatar;
  }
  // 否则加上服务器地址
  return "http://localhost:3000" + props.avatar;
});
</script>

<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <img v-if="props.avatar" :src="uploadAvatr" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<style scoped>
.avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.avatar {
  width: 178px;
  height: 178px;
}
</style>
