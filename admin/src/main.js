import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Particles from "@tsparticles/vue3";
import { loadSlim } from "@tsparticles/slim";
import "@/util/axios.config";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(ElementPlus);
app.use(pinia);
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine);
  },
});
app.use(router);
app.mount("#app");
