<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/util/axios.config";
import { ElMessage } from "element-plus";
import { useMainStore } from "../store/index";
const options = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
const store = useMainStore();

const loginForm = reactive({
  username: "",
  password: "",
});

const loginFormRef = ref();

const loginRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const router = useRouter();
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        if (res.data.ActionType === "OK") {
          store.changeUserInfo(res.data.data);
          store.isGetterRouter = false;
          router.push("/mainbox");
        } else {
          ElMessage.error("用户名密码不匹配");
        }
      });
    }
  });
};
</script>

<template>
  <div>
    <vue-particles id="tsparticles" :options="options" />
    <div class="formContainer">
      <h3>企业门户网站管理系统</h3>
      <el-form
        ref="loginFormRef"
        style="max-width: 600px"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="auto"
        class="login-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 20px;
}

h3 {
  font-size: 30px;
}

.login-ruleForm {
  margin-top: 20px;
}

:deep(.el-form-item__label) {
  color: white;
}

.el-button {
  margin-left: 65px;
}
</style>
