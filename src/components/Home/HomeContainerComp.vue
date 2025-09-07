<script setup lang="ts">

import HomeContainerTimeComp from "@/components/Home/Container/HomeContainerTimeComp.vue";
import HomeContainerSelectItemComp
  from "@/components/Home/Container/HomeContainerSelectItemComp.vue";
import HomeContainerMessageComp from "@/components/Home/Container/HomeContainerMessageComp.vue";
import HomeContainerUpdatedComp from "@/components/Home/Container/HomeContainerUpdatedComp.vue";
import HomeContainerJoinComp from "@/components/Home/Container/HomeContainerJoinComp.vue";
import HomeNoticeComp from "@/components/Home/Container/HomeNoticeComp.vue";
import HomeArticleComp from "@/components/Home/Container/HomeArticleComp.vue";
import HomeContainerFriendshipComp
  from "@/components/Home/Container/HomeContainerFriendshipComp.vue";
</script>

<template>
  <div class="container">
    <div class="c1">
      <div class="c1_left">
        <HomeContainerTimeComp/>
        <HomeContainerSelectItemComp/>
        <HomeContainerMessageComp/>
      </div>
      <div class="c1_right">
        <HomeContainerUpdatedComp/>
        <HomeContainerJoinComp/>
      </div>
    </div>
    <div class="c2">
      <HomeNoticeComp/>
      <HomeArticleComp/>
    </div>
    <div class="c3">
      <HomeContainerFriendshipComp/>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 6rem auto 0 auto;
  max-width: calc(100vw - 10rem);
  min-height: calc(100vh - 70px - 6rem);
  display: flex;
  flex-direction: column;
}
.c1 {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  .c1_right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
.c2 {
  background-color: #ffffff80;
  padding: 1rem;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.c3 {
  background-color:  #ffffff80;
  padding: 1rem;
  margin-top: 1rem;
}
</style>
