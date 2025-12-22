<script setup lang="ts">
import {useWorkItemListPinia} from "@/stores/WorkItemListPinia.ts";
import {storeToRefs} from "pinia";

const workItemListPinia = useWorkItemListPinia();

const {workList} = storeToRefs(workItemListPinia);

</script>

<template>
  <div v-if="workList.length > 0">
    <div v-for="item in workList" :key="item.id">
      {{item.title}}
    </div>
  </div>
  <div v-else>暂无数据</div>
</template>

<style scoped>

</style>
