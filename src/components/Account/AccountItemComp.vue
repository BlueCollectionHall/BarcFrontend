<script setup lang="ts">
import {useAccountContentPinia} from "@/stores/AccountContentPinia.ts";
import {storeToRefs} from "pinia";
const accountContentPinia = useAccountContentPinia();
import {useRoute} from "vue-router";
import {errorMessage} from "@/utils/MessageAlert.ts";
import {onMounted} from "vue";
const route = useRoute();

interface ItemImpl {label: string; value: string; icon: string; color: string}

const itemList: Array<ItemImpl> = [
  {label: "作品集", value: "works", icon: "HighlightOutlined", color: "#0EB350"},
  {label: "收录集", value: "collections", icon: "ReadOutlined", color: "#40C5F1"},
  {label: "喜欢", value: "likes", icon: "HeartOutlined", color: "#F85A54"},
];

const {selectedItemValue} = storeToRefs(accountContentPinia);

const changeSelect = (target: string) => {
  accountContentPinia.changeSelected(target);
  if (route.query.username) {
    accountContentPinia.fetchWorks(route.query.username as string);
  } else errorMessage("页面缺少重要数据！");
}

onMounted(() => {
  if (route.query.username) {
    accountContentPinia.fetchWorks(route.query.username as string);
  }
})
</script>

<template>
  <div class="account_item_box">
    <div class="items">
      <div class="item" v-for="item in itemList" :key="item.value" @click="changeSelect(item.value)">
        <component class="icon" :is="item.icon" :style="{'color': item.color}"/>
        <div :class="selectedItemValue === item.value? 'item_selected': ''">{{item.label}}</div>
      </div>
      <div style="margin-right: auto">施工中</div>
    </div>
  </div>
</template>

<style scoped>
.account_item_box {
  height: 4rem;
  width: 100%;
  box-shadow: 0 0 0.1rem 0.1rem rgb(0 0 0 / 10%);
  position: relative;
  padding: 0 10% 0 10%;
}
.items {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
}
.item {
  transition: .3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  gap: .4rem;
  color: #18191C;
  .icon {
    font-size: 1.6rem;
  }
}
.item_selected {
  color: #00AEEC;
}
.item:hover {
  color: #fe4b7b;
  cursor: pointer;
}
</style>
