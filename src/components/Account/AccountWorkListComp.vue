<script setup lang="ts">
import {EyeOutlined, HeartOutlined} from "@ant-design/icons-vue";
import {useAccountContentPinia} from "@/stores/AccountContentPinia.ts";
import {storeToRefs} from "pinia";
const accountContentPinia = useAccountContentPinia();

const {workList} = storeToRefs(accountContentPinia);
</script>

<template>
  <div class="work_list_box" v-if="workList.length > 0">
    <div class="item" v-for="item in workList" :key="item.id">
      <div class="cover_box">
        <img class="cover_image" :src="item.cover_image" alt="cover"/>
        <div class="cover_z">
          <EyeOutlined /> {{item.view_count}} &nbsp;&nbsp; <HeartOutlined /> {{item.like_count}}
        </div>
      </div>
      {{item.title}}
    </div>
  </div>
</template>

<style scoped>
.work_list_box {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-content: space-between;
  padding: 2rem 10%;
  row-gap: 4rem;
}
@media (min-width: 1340px) {
  .work_list_box {
    grid-template-columns: repeat(5, 1fr);
  }
}
.work_list_box::after {
  content: "";
  flex: auto;
}
.item {
  flex: 0 0 calc(20% - 1.5rem);
}
.cover_box {
  border-radius: .5rem;
  width: calc(16 * .9vw);
  height: calc(9 * .9vw);
  overflow: hidden;
  position: relative;
  .cover_image {
    width: 100%;
    z-index: -2;
  }
}
.cover_z {
  color: white;
  width: 100%;
  background: linear-gradient(180deg,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 150%);
  position: absolute;
  bottom: 0;
  padding: .4rem 0 .4rem .8rem;
}
</style>
