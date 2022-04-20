import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { StorageKeys } from "@/types/storage";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomePage/HomePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.role === "user") {
    if (!sessionStorage.getItem(StorageKeys.Token)) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
