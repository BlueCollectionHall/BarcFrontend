import { createRouter, createWebHistory } from 'vue-router'
import HomeRouter from "@/router/HomeRouter.ts";
import SignRouter from "@/router/SignRouter.ts";
import MessageBoardRouter from "@/router/MessageBoardRouter.ts";
import AccountRouter from "@/router/AccountRouter.ts";
import StudentRouter from "@/router/StudentRouter.ts";
import ServiceRouter from "@/router/ServiceRouter.ts";
import FeedbackRouter from "@/router/FeedbackRouter.ts";
import JoinRouter from "@/router/JoinRouter.ts";
import UploadRouter from "@/router/UploadRouter.ts";
import ManageRouter from "@/router/ManageRouter.ts";
import UpdateRouter from "@/router/UpdateRouter.ts";
import NoticeRouter from "@/router/NoticeRouter.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    HomeRouter,
    SignRouter,
    MessageBoardRouter,
    AccountRouter,
    StudentRouter,
    ServiceRouter,
    FeedbackRouter,
    JoinRouter,
    UploadRouter,
    ManageRouter,
    UpdateRouter,
    NoticeRouter,
  ],
})

export default router
