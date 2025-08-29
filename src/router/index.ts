import { createRouter, createWebHistory } from 'vue-router'
import HomeRouter from "@/router/HomeRouter.ts";
import SignRouter from "@/router/SignRouter.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeRouter,
    SignRouter,
  ],
})

export default router
