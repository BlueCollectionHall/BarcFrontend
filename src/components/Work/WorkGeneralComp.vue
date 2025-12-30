<!--
    通用组件
    当存在query时所有Work的列表子路由通用该组件
 -->
<script setup lang="ts">
import {onMounted} from "vue";
import WorkItemListComp from "@/components/Work/WorkItemListComp.vue";
import {useWorkItemListPinia} from "@/stores/WorkItemListPinia.ts";

const workItemListPinia = useWorkItemListPinia();

onMounted(() => {
  console.log("Component mounted. WorkGeneralComp.vue");
  workItemListPinia.fetchWorkList("PUBLIC");
})


</script>

<template>
  <WorkItemListComp/>
</template>

<style scoped>
</style>
