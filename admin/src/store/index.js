import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore(
  "main",
  () => {
    const isGetterRouter = ref(false);
    const isCollapsed = ref(false);
    const userInfo = ref({});

    const changeUserInfo = (value) => {
      userInfo.value = {
        ...userInfo.value,
        ...value,
      };
    };

    const clearUserInfo = (value) => {
      userInfo.value = {};
    };
    return {
      isGetterRouter,
      isCollapsed,
      userInfo,
      changeUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: {
      key: "main-store",
      storage: localStorage,
      pick: ["isCollapsed", "userInfo"],
    },
  }
);
