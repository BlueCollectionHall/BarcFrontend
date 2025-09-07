<script setup lang="ts">
import "@/style/Background.css";
import {onMounted, ref} from "vue";

interface ImageNameImpl {
  day: Array<string>;
  eventing: Array<string>;
  night: Array<string>;
}

const imagesName: ImageNameImpl = {
  day: ['bg_day_purana_1.jpg'],
  eventing: ['bg_evening_seia_1.jpg'],
  night: ['bg_night_hina_1.jpg'],
}

const imageName = ref<string | null>(null);

const selectImage = () => {
  const date: Date = new Date();
  const hour: number = date.getHours();
  const baseUrl: string = "https://file.naigos.cn:52011/barctemp/"
  if (hour < 6) {
    imageName.value = baseUrl + imagesName.night[Math.floor(Math.random() * imagesName.night.length)];
  } else if (hour < 17) {
    imageName.value = baseUrl + imagesName.day[Math.floor(Math.random() * imagesName.day.length)];
  } else if (hour < 19) {
    imageName.value = baseUrl + imagesName.eventing[Math.floor(Math.random() * imagesName.eventing.length)];
  } else {
    imageName.value = baseUrl + imagesName.night[Math.floor(Math.random() * imagesName.night.length)];
  }
  console.log(imageName.value);
}
onMounted(() => {
  selectImage();
})
</script>

<template>
  <div class="bg_box">
    <img class="bgi" v-if="imageName" :src="imageName" alt="bg">
  </div>
</template>

<style scoped>

</style>
