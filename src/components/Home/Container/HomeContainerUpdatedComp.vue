<script setup lang="ts">
import {FolderOpenOutlined} from '@ant-design/icons-vue'
import {onMounted, ref} from "vue";
import type {StudentImpl} from "@/interfaces/BaImpl.ts";
import {baseHttp} from "@/utils/https.ts";

const studentList = ref<Array<StudentImpl>>([]);

const fetchUpdatedStudents = async () => {
  // try {
  //   const response = await baseHttp.get("/")
  // }

}

onMounted(async () => {
  await fetchUpdatedStudents();
})
</script>

<template>
  <div class="Updated_box">
    <div class="students no_list" v-if="studentList.length === 0">
<!--      <FolderOpenOutlined />-->
      <img class="icon" src="https://static.kivo.wiki/images/gallery/E1.%E5%AE%98%E6%96%B9%E8%A1%A8%E6%83%85%E5%8C%85/Default/cafabb328c6564d3445ebaa00e1c510f.gif" alt="icon"/>
      <span class="text">近一个月内暂无最新收录作品对应的学生</span>
    </div>
    <div class="students" v-else>

    </div>
  </div>
</template>

<style scoped>
.Updated_box {
  width: 100%;
  background-color: #ffffff90;
  min-height: 20rem;
  box-shadow: 0 0 .05rem .05rem rgb(0 0 0 / 5%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.no_list {
  gap: 1rem;
  .icon {
    width: 5rem;
  }
  .text {
    font-weight: bold;
    color: #56508c;
    letter-spacing: .1rem;
    font-size: 1.3rem;
  }
}
</style>
