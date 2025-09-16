<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserPinia} from "@/stores/UserPinia.ts";
import {storeToRefs} from "pinia";
const userPinia = useUserPinia();
import {useRouter, useRoute} from "vue-router";
const router = useRouter();
const route = useRoute();

interface ItemImpl {label: string; value: string; icon: string; is_self: boolean}

const items: Array<ItemImpl> = [
  {label: "账号修改", value: "Edit", icon: "SettingOutlined", is_self: true},
  {label: "上传作品", value: "WorkUpload", icon: "ArrowUpOutlined", is_self: true},
  {label: "内容管理", value: "ContentManage", icon: "SlidersOutlined", is_self: true},
  {label: "投诉此人", value: "FeedbackUser", icon: "AlertOutlined", is_self: false},
];

const {userBasic} = storeToRefs(userPinia);
const routeUsername = ref<string | null>(null);

onMounted(() => {
  const username = route.query.username as string;
  if (username) {
    routeUsername.value = username;
  }
})

</script>

<template>
  <header class="header">
    <!--  anotherInfo  -->
    <div class="anotherInfo">
      B.A.R.C
    </div>

    <!--  menu  -->
    <div class="menu-container">
      <RouterLink
        class="menu-item"
        :to="item.value"
        v-for="item in items"
        :key="item.value">
        <div v-if="item.is_self && routeUsername === userBasic?.username">
          <component :is="item.icon"/>
          {{item.label}}
        </div>
        <div v-else-if="!item.is_self">
          <component :is="item.icon"/>
          {{item.label}}
        </div>
      </RouterLink>
    </div>

  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; /* 定位参考基准 */
  height: 70px;
  background-color: #ffffff70;
  box-shadow: 0 0 0.1rem 0.1rem rgb(0 0 0 / 10%);
  overflow: hidden;
  padding: 10px;
  padding-inline: 30px;
  transition: all 0.5s;
  color: #000000;
}
.container:hover {
  background-color:  #ffffff;
}


/* -- menu-container style -- */
.menu-container {
  display: flex;
  flex-direction: row;

  .menu-item {
    margin-inline: 10px;
    font-family: "HarmonyOS Sans", sans-serif;
    color: #000000;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
    /* 确保不影响点击事件 */
    pointer-events: auto;
    /* 禁止用户选中 */
    user-select: none;
    /* 下划线样式 */
    background: linear-gradient(to right, #9b9b9b, #9b9b9b) no-repeat right bottom;
    background-size: 0 2px;
    transition: background-size .2s;

  }

  .menu-item:hover {
    background-position: left bottom;
    background-size: 100% 2px;
  }

  /* 被激活时的样式 */

  .menu-item.active {
    /* 下划线样式 */
    background: linear-gradient(to right, #9b9b9b, #9b9b9b) no-repeat right bottom;
    background-size: auto 2px;
  }
}
</style>
