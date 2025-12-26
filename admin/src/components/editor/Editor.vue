<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineProps,
  defineEmits,
  watch,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref(props.modelValue);

// 监听 props 变化，更新编辑器内容
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== valueHtml.value) {
      valueHtml.value = newVal;
    }
  }
);

const toolbarConfig = {};
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      server: "/adminapi/news/uploadImage",
      fieldName: "file",
      maxFileSize: 10 * 1024 * 1024, // 10MB
      // 使用函数动态获取 token，确保每次上传时都能拿到最新的 token
      customUpload(file, insertFn) {
        const formData = new FormData();
        formData.append("file", file);

        fetch("/adminapi/news/uploadImage", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.errno === 0 && res.data && res.data.url) {
              insertFn(res.data.url, file.name, res.data.url);
            }
          })
          .catch((err) => {
            console.error("上传失败", err);
          });
      },
    },
  },
};
const mode = "default";

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor;
};

const handleChange = (editor) => {
  emit("update:modelValue", editor.getHtml());
};
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
