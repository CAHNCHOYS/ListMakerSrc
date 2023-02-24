import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/categories",
      name: "choose-category",
      component: () => import("../views/ListCategoryPick.vue"),
    },
    {
      path: "/create/:category",
      name: "list-creation",
      component: () => import("../views/ListCreation.vue"),
      props: true,
    },
    {
      path: "/userLists",
      name: "all-lists",
      component: () => import("../views/AllUserLists.vue"),
    },
    {
      path: "/list/:name",
      name: "single-list",
      component: () => import("../views/SingleListPage.vue"),
      props: true,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundPage.vue"),
    },
  ],
  linkActiveClass: "current-page",
  scrollBehavior: (to, from, savedPosition) => {
    return (
      savedPosition ||
      new Promise((res) => {
        setTimeout(() => res({ top: 0, behavior: "smooth" }), 500);
      })
    );
  },
});

export default router;
