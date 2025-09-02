<script setup lang="ts">

import HomeContainerTimeComp from "@/components/Home/Container/HomeContainerTimeComp.vue";
import HomeContainerSelectItemComp
  from "@/components/Home/Container/HomeContainerSelectItemComp.vue";
import HomeContainerMessageComp from "@/components/Home/Container/HomeContainerMessageComp.vue";
import HomeContainerWorkItemComp from "@/components/Home/Container/HomeContainerWorkItemComp.vue";
</script>

<template>
  <div class="container">
    <div class="c1">
      <div>
        <HomeContainerTimeComp/>
        <HomeContainerSelectItemComp/>
        <HomeContainerMessageComp/>
      </div>
      <div>
        <HomeContainerWorkItemComp/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: calc(100vw - 10rem);
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
}
.c1 {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}
</style>
