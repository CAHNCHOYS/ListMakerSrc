import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
      component: () => import("../views/ChooseCategoryView.vue"),
    },
    {
      path: "/create/:category",
      name: "list-creation",
      component: () => import("../views/CreateListView.vue"),
      props: true,
    },
    {
      path: "/userLists",
      name: "all-lists",
      component: () => import("../views/AllUserListsView.vue"),
    },
    {
      path: "/list/:name",
      name: "single-list",
      component: () => import("../views/ListView.vue"),
      props: true,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFoundPageView.vue"),
    },
  ],
  linkActiveClass: "current-page",
});

export default router;
