import { createRouter, createWebHistory } from 'vue-router'
import HomeRouter from "@/router/HomeRouter.ts";
import SignRouter from "@/router/SignRouter.ts";
import MessageBoardRouter from "@/router/MessageBoardRouter.ts";
import AccountRouter from "@/router/AccountRouter.ts";
import StudentRouter from "@/router/StudentRouter.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeRouter,
    SignRouter,
    MessageBoardRouter,
    AccountRouter,
    StudentRouter,
  ],
})

export default router
