import WorkView from "@/views/WorkView.vue";
import WorkAllComp from "@/components/Work/WorkAllComp.vue";
import WorkUserComp from "@/components/Work/WorkUserComp.vue";

export default {
  path: "/work",
  component: WorkView,
  redirect: {name: "WorkAll"},
  children: [
    {
      path: "all",
      name: "WorkAll",
      component: WorkAllComp
    },
    {
      path: "user",
      name: "WorkUser",
      component: WorkUserComp
    }
  ]
}
