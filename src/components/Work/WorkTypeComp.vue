<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

interface ItemImpl {
  label: string; value: string; icon?: string; router: string;
}

const items: Array<ItemImpl> = [
  {label: "综合", value: "all", router: "WorkAll"},
  {label: "标题", value: "title", router: "WorkTitle"},
  {label: "学园", value: "school", router: "WorkSchool"},
  {label: "部团", value: "club", router: "WorkClub"},
  {label: "学生", value: "student", router: "WorkStudent"},
  {label: "用户", value: "user", router: "WorkUser"},
]

const selectedItemValue = ref<string>("all");

const itemClicked = (target: string, value: string) => {
  selectedItemValue.value = value;
  router.push({name: target});
}
</script>

<template>
  <div class="items">
    <div
      :class="'item' + (selectedItemValue === item.value ? ' selected' : '')"
      v-for="item in items"
      :key="item.value"
      @click="itemClicked(item.router, item.value)"
    >
      {{item.label}}
    </div>
  </div>
</template>

<style scoped>
.items {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  .item:hover {
    cursor: pointer;
  }
  .item {
    color: #364d79;
    font-size: 1.1rem;
  }
}
.selected {
  color: #bf61a1 !important;
}
</style>
