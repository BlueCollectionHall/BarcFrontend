<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();

const keyword = ref<string>("");

onMounted(() => {
  const routeKeyword: string | null | undefined = route.query.keyword as string | null | undefined;
  if (routeKeyword) {
    keyword.value = routeKeyword;
  }
})
</script>

<template>
  <div class="search_bar">
    <el-input class="input" placeholder="请输入关键词以搜索" v-model="keyword" />
    <el-button class="button" type="primary" native-type="button">搜索</el-button>
  </div>
</template>

<style scoped>
.search_bar {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  .input, .button {
    height: 2.5rem;
  }
  .button {
    font-size: 1.1rem;
    width: 7rem;
  }
}
</style>
