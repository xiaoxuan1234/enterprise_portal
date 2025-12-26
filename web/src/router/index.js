import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import New from "../views/New.vue";
import Product from "../views/Product.vue";
import "nprogress/nprogress.css";
import nprogress from "nprogress";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/news",
    name: "news",
    component: News,
  },
  {
    path: "/news/:id",
    name: "new",
    component: New,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});

router.afterEach((to, from, next) => {
  nprogress.done();
});

export default router;
