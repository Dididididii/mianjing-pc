import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/components/Dashboard.vue";
import Article from "@/views/components/Article.vue";
import store from "@/store";
import NotFound from "@/views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "article",
        name: "Article",
        component: Article,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "*",
    component: NotFound,
    // redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果是跳转到login页面，直接放行
  // if (to.path === "/login" && !store.state.user.token) {
  //   next();
  // } else if (store.state.user.token) {
  //   // 如果是跳转到其他页面，先检查是否有token
  //   const token = store.state.user.token;
  //   if (token) {
  //     next();
  //   } else {
  //     // ���有token，跳转到login页面
  //     next("/login");
  //   }
  // }
  if (to.path !== "/login" && !store.state.user.token) {
    // 无token访问其他页
    next("/login");
  } else if (to.path === "/login" && store.state.user.token) {
    // 有token访问login
    next(from.path);
  } else {
    next();
  }
});

export default router;
