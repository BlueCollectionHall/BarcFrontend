<script setup lang="ts">
import {useUserPinia} from "@/stores/UserPinia.ts";
import {storeToRefs} from "pinia";
const userPinia = useUserPinia();

const {userArchive} = storeToRefs(userPinia);
</script>

<template>
  <el-form v-if="userArchive" :model="userArchive" label-width="auto">
    <el-form-item label="昵称：" required>
      <el-input v-model="userArchive.nickname"/>
    </el-form-item>
    <el-form-item label="性别：" required>
      <el-radio-group v-model="userArchive.gender">
        <el-radio :value="0">男</el-radio>
        <el-radio :value="1">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="生日：" required>
      <el-date-picker
        v-model="userArchive.birthday"
        type="date"
        placeholder="选择日期"
        :size="'default'"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
