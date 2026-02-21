<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import WorkCategorySearchBarComp from "@/components/Work/Category/WorkCategorySearchBarComp.vue";
import WorkCategoryTypeComp from "@/components/Work/Category/WorkCategoryTypeComp.vue";
import HeaderComp from "@/components/HeaderFooter/HeaderComp.vue";

const route = useRoute();
const router = useRouter();


</script>

<template>
  <HeaderComp/>
  <WorkCategorySearchBarComp/>
  <WorkCategoryTypeComp/>
</template>

<style scoped>

</style>
