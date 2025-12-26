// 所有可配置的路由（根据权限动态添加）
const routeConfig = [
  {
    path: "/index",
    name: "home",
    component: () => import("../views/home/Home.vue"),
  },
  {
    path: "/center",
    name: "center",
    component: () => import("../views/center/Center.vue"),
  },
  {
    path: "/user/list",
    name: "userList",
    component: () => import("../views/user-manage/UserList.vue"),
    requireAdmin: true,
  },
  {
    path: "/user/add",
    name: "userAdd",
    component: () => import("../views/user-manage/UserAdd.vue"),
    requireAdmin: true,
  },
  {
    path: "/product/list",
    name: "productList",
    component: () => import("../views/product-manage/ProductList.vue"),
  },
  {
    path: "/product/add",
    name: "productAdd",
    component: () => import("../views/product-manage/ProductAdd.vue"),
  },
  {
    path: "/product/editproduct/:id",
    name: "productEdit",
    component: () => import("../views/product-manage/ProductEdit.vue"),
  },
  {
    path: "/news/list",
    name: "newsList",
    component: () => import("../views/news-manage/NewsList.vue"),
  },

  {
    path: "/news/add",
    name: "newsAdd",
    component: () => import("../views/news-manage/NewsAdd.vue"),
  },
  {
    path: "/news/editnews/:id",
    name: "newsEdit",
    component: () => import("../views/news-manage/NewsEdit.vue"),
  },
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Notfound",
    component: () => import("../views/notfound/NotFound.vue"),
  },
];

export default routeConfig;
