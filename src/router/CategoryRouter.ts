import CategoryView from "@/views/CategoryView.vue";

export default {
  path: "/category",
  name: "Category",
  component: CategoryView,
  children: [
    {
      path: ":category_id",
      props: true,
      name: "CategoryOnly"
    }
  ]
}
