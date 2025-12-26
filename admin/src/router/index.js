import { createRouter, createWebHashHistory } from "vue-router";
import routeConfig from "./config";
import Login from "../views/Login.vue";
import MainBox from "../views/MainBox.vue";
import { useMainStore } from "../store";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const configRouter = (store) => {
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox,
    });
  }

  routeConfig.forEach((item) => {
    checkPermission(item) && router.addRoute("mainbox", item);
  });
  store.isGetterRouter = true;
};

router.beforeEach((to, from, next) => {
  const store = useMainStore();
  if (to.name === "login") {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      next({ path: "/login" });
    } else {
      if (!store.isGetterRouter) {
        router.removeRoute("mainbox");
        configRouter(store);
        next({
          path: to.fullPath,
        });
      } else {
        next();
      }
    }
  }
});

const checkPermission = (item) => {
  const store = useMainStore();
  if (item.requireAdmin) {
    return store.userInfo.role === 1;
  }
  return true;
};

export default router;
