<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {CategoryImpl} from "@/interfaces/CategoryImpl.ts";
import {baseHttp} from "@/utils/https.ts";
import {useUserPinia} from "@/stores/UserPinia.ts";
import {storeToRefs} from "pinia";
const userPinia = useUserPinia();
import {useRouter} from "vue-router";
const router = useRouter();

const category = ref<Array<CategoryImpl> | null>(null);
const {userArchive, userBasic} = storeToRefs(userPinia);

const fetchCategory = async () => {
  await baseHttp ({
    url: "/api/category/all",
    method: "GET"
  }).then(res => {
    if (res.data.code === 0) {
      category.value = res.data.data;
    }
  })
}

const toAccountView = (username: string) => {
  router.push({name: "Account", query: {username: username}});
}
onMounted(() => {
  fetchCategory();
})
</script>

<template>
  <header class="header">
    <!--  anotherInfo  -->
    <div class="anotherInfo">
      B.A.R.C
    </div>

    <!--  menu  -->
    <div class="menu-container" v-if="category">
      <router-link v-for="item in category" :key="item.id" class="menu-item" :to="item.id">{{item.name}}</router-link>
<!--      <router-link class="menu-item" to="/" active-class="active">主页</router-link>-->
<!--      <router-link class="menu-item" to="/works" active-class="active">作品</router-link>-->
<!--      <router-link class="menu-item" to="/about" active-class="active">关于</router-link>-->
<!--      <router-link class="menu-item" to="/more" active-class="active">更多</router-link>-->
<!--      <router-link class="menu-item" to="/test" active-class="active">接口测试</router-link>-->
      <router-link class="menu-item" to="/sign" active-class="active" v-if="userArchive === null || userBasic === null">登录 | 注册</router-link>
<!--      <router-link class="menu-item" to="/user" active-class="active" v-else>{{ userArchive?.nickname }}</router-link>-->
      <img @click="toAccountView(userBasic.username)" v-else :src="userArchive.avatar || 'null'" alt="avatar" style="width: 48px; border: #deefff 2px solid; border-radius: 20px"/>
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
