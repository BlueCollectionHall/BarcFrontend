<script setup lang="ts">
import {useUserPinia} from "@/stores/UserPinia.ts";
import {storeToRefs} from "pinia";
import {baseHttp} from "@/utils/https.ts";
const userPinia = useUserPinia();

const {userBasic} = storeToRefs(userPinia);


</script>

<template>
  <el-form v-if="userBasic" :model="userBasic" label-width="auto">
    <el-form-item label="用户名：" required>
      <el-input placeholder="用户名唯一性，用于查找到您" v-model="userBasic.username"/>
    </el-form-item>
    <el-form-item label="电话：">
      <el-input v-model="userBasic.telephone" placeholder="社交展示，非必须"/>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
