<script setup lang="ts">
import {EyeOutlined, HeartOutlined, UserOutlined} from "@ant-design/icons-vue";
import {storeToRefs} from "pinia";
import {useWorkItemListPinia} from "@/stores/WorkItemListPinia.ts";

const workItemListPinia = useWorkItemListPinia();

const {workList} = storeToRefs(workItemListPinia);
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
      <div class="title_nickname">
        <span class="title">{{item.title}}</span>
        <span class="nickname">
          <UserOutlined />
          {{item.is_claim? 'isClaim': item.author_nickname}}
        </span>
      </div>
    </div>
  </div>
  <div class="no_list" v-else>
    <img class="icon" src="https://static.kivo.wiki/images/gallery/E1.%E5%AE%98%E6%96%B9%E8%A1%A8%E6%83%85%E5%8C%85/Default/cafabb328c6564d3445ebaa00e1c510f.gif" alt="icon"/>
    <span class="text">暂无数据</span>
  </div>
</template>

<style scoped>
.work_list_box {
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-content: space-between;
  row-gap: 1rem;
}
@media (min-width: 1040px) {
  .work_list_box {
    grid-template-columns: repeat(5, 1fr);
  }
}
@media (min-width: 1540px) {
  .work_list_box {
    grid-template-columns: repeat(6, 1fr);
  }
}
.work_list_box::after {
  content: "";
  flex: auto;
}
.item {
  flex: 0 0 calc(20% - 1.5rem);
  .title_nickname {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    .title {
      font-size: 1.1rem;
    }
    .nickname {
      color: #787878;
      font-size: .9rem;
    }
  }
}
.cover_box {
  border-radius: .5rem;
  width: calc(16 * .7vw);
  height: calc(9 * .7vw);
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
.no_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .icon {
    width: 10rem;
  }
  .text {
    color: white;
    text-shadow: #9b9b9b 0 0 5px;
    font-weight: bold;
    font-size: 2rem;
  }
}
</style>
