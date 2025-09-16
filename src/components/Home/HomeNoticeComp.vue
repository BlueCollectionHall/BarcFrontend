<script setup lang="ts">
import {ref} from "vue";
import {SoundOutlined} from '@ant-design/icons-vue';

const noticeList = ref<Array<string>>([]);

</script>

<template>
  <div class="notice_box">
    <div class="title">
<!--      <img class="icon" src="https://static.kivo.wiki/images/gallery/D2.%E6%B8%B8%E6%88%8F%E5%86%85%E6%9D%82%E9%A1%B9/Category/Emoticon_Exclamation.png" alt="icon"/>-->
      <SoundOutlined />
      最新公告
      <a-button class="more_button" ghost type="primary">更多</a-button>
    </div>
    <div class="notices no_list" v-if="noticeList.length === 0">
      <img class="icon" src="https://static.kivo.wiki/images/gallery/4.%E5%AE%98%E6%96%B9-%E8%A1%A8%E6%83%85%E5%8C%85/%E7%8E%A9%E6%89%8B%E6%9C%BA_09.gif" alt="icon"/>
      <span>暂无数据</span>
    </div>
    <div class="notices" v-else>

    </div>
  </div>
</template>

<style scoped>
.notice_box {
  background-color: white;
  padding: 1rem;
  min-height: 10rem;
}
.title {
  display: flex;
  align-items: center;
  gap: .5rem;
  font-size: 1.2rem;
  .icon {
    height: 2rem;
  }
  .more_button {
    margin-left: auto;
  }
}
.no_list {
  display: flex;
  gap: .5rem;
  font-size: 1.1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    width: 5rem;
  }
}
</style>
