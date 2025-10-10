<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import type {WorkImpl} from "@/interfaces/WorkImpl.ts";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons-vue";

// 封面图相关
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import {errorMessage, successMessage} from "@/utils/MessageAlert.ts";
import {useUserPinia} from "@/stores/UserPinia.ts";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
// 封面图相关 - 响应式变量
const coverStatus = ref<number>(0);
const cropImageValue = ref<string | null>(null);
const croppedImageBase64Value = ref<string | null>(null);
const croppedImageFileValue = ref<FormData | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
let cropper: Cropper | null = null;
// 封面图相关 - 处理图片选择
const selectImageFile = (e: Event) => {
  cropImageValue.value = null;
  const {files} = e.target as HTMLInputElement;
  if (!files || !files.length) return;
  const file = files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    cropImageValue.value = String(reader.result);
    if (inputRef.value) inputRef.value.value = "";
    nextTick(() => {initCropper()});
  }
};
// 封面图相关 - 初始化裁剪器
const initCropper = () => {
  if (!imageRef.value) return;
  // 销毁旧实例
  if (cropper) {
    cropper.destroy();
  }
  // 创建新实例
  cropper = new Cropper(imageRef.value as HTMLImageElement, {
    aspectRatio: 16 / 9,  // 16:9 比例
    viewMode: 1,          // 限制裁剪框在图片内
    dragMode: 'move',     // 允许移动图片
    guides: true,         // 显示辅助线
    background: false,    // 禁用背景
    autoCropArea: 0.8,    // 初始裁剪区域占比
    preview: ".cover_image_preview",  // 预览图
  });
};
// 获取裁剪结果
const getCroppedImage = () => {
  if (!cropper) {
    errorMessage("图片加载失败");
    coverStatus.value = 2;
    return;
  }
  const canvas = cropper.getCroppedCanvas({
    width: 1920,         // 输出宽度（16:9对应高度为1080）
    height: 1080,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "high"
  });
  canvas?.toBlob((blob: Blob | null) => {
    if (!blob) {
      errorMessage("动态裁剪失败");
      coverStatus.value = 2;
      return;
    }
    const formData = new FormData();
    formData.append("cover_image", blob, "123");
    croppedImageFileValue.value = formData;
    croppedImageBase64Value.value = URL.createObjectURL(blob);
    coverStatus.value = 1;
    successMessage("已成功选择封面图");
  });
};

const userPinia = useUserPinia();
const router = useRouter();
const route = useRoute();

const {userBasic} = storeToRefs(userPinia);
const workForm = ref<WorkImpl>({
  id: "", author: "", author_nickname: null, banner_image: "", cover_image: "", content: null, description: null, is_claim: false, status: "PUBLIC", title: "", view_count: 0, like_count: 0, student: "", uploader: null, created_at: new Date(), updated_at: new Date()
});

onMounted(() => {
  const username: string = route.query.username as string;
  if (username !== userBasic.value?.username) {
    errorMessage("路径与已登录信息不匹配");
    router.back();
    return;
  }
})

watch(() => workForm.value.is_claim, (newVal: boolean) => {
  if (userBasic.value === null) {
    errorMessage("未登录禁止上传作品");
    return;
  }
  if (newVal) {
    workForm.value.author = userBasic.value.uuid;
  } else {
    workForm.value.uploader = userBasic.value.uuid;
  }
});
watch(() => workForm.value.content, newVal => {
  sm.value = newVal;
})
const sm = ref<string | null>(null);

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// 编辑器内容（双向绑定）
const content = ref('<p>初始内容</p>')

// 编辑器配置
const editorOptions = ref({
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image']
    ]
  },
  placeholder: '请输入内容...',
  theme: 'snow'
})

// 内容变化处理
const handleChange = (html: string) => {
  // 过滤危险标签（可选）
  workForm.value.content = html.replace(/<script.*?>.*?<\/script>/gis, '')
}

// 图片上传处理（示例）
const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  // 调用上传API（示例）
  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })

  return (await res.json()).url
}
</script>

<template>
  {{sm}}
  <div class="container">
    <div class="title">
      <h1>发布/收录作品</h1>
    </div>
    <div class="cover_image_box">
      <QuestionCircleOutlined v-if="coverStatus === 0" class="cover_status_icon warning" />
      <CheckCircleOutlined v-else-if="coverStatus === 1" class="cover_status_icon success" />
      <CloseCircleOutlined v-else-if="coverStatus === 2" class="cover_status_icon failed" />

      <h2 class="cover_title">上传封面</h2>
      <!-- 图片上传 -->
      <div class="input_item_box">
        <input
          type="file"
          accept="image/*"
          @change="selectImageFile"
          class="file-input"/>
        <el-button type="success" @click="getCroppedImage">确认使用</el-button>
      </div>
      <div class="crop_and_preview">
        <!-- 裁剪区域 -->
        <div class="crop-area">
          <img
            ref="imageRef"
            :src="cropImageValue"
            v-if="cropImageValue"
            class="crop-image"
            alt="crop-area"/>
        </div>
        <div class="cover_image_preview_box">
          <div>
            <p>16:9尺寸</p>
            <div class="cover_image_preview w16h9"></div>
          </div>
          <div>
            <p>4:3尺寸</p>
            <div class="w4h3_box">
              <div class="cover_image_preview w4h3"></div>
            </div>
          </div>
          <div v-if=croppedImageBase64Value>
            <p>最终图片(16:9)</p>
            <img class="cover_final_image" :src="croppedImageBase64Value" alt="cover_final_image" />
          </div>
        </div>
      </div>
      <!-- 裁剪结果 -->
<!--      <button @click="getCroppedImage">保存图片</button>-->
<!--      <div v-if="croppedImageBase64Value" class="result">-->
<!--        <h3>裁剪结果：</h3>-->
<!--        <img :src="croppedImageBase64Value" class="cropped-img">-->
<!--        <button @click="getCroppedImage">保存图片</button>-->
<!--      </div>-->
    </div>
    <div class="work_info_box">
      <div class="work_props_box box">
        <el-form :model="workForm" label-width="auto">
          <el-form-item label="作品ID号：">
            <el-input v-model="workForm.id" placeholder="您可以自定义ID号，但如果已被占用，将会被打回！"/>
          </el-form-item>
          <el-form-item label="作品标题：" required>
            <el-input v-model="workForm.title"/>
          </el-form-item>
          <el-form-item label="作品简述：">
            <el-input v-model="workForm.description"/>
          </el-form-item>
          <el-form-item label="作品类型：" required>
            <el-radio-group v-model="workForm.is_claim">
              <el-radio :value="true">自创</el-radio>
              <el-radio :value="false">收录</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="作品作者：" v-if="!workForm.is_claim" required>
            <el-input v-model="workForm.author_nickname" placeholder="请输入该作品的作者在其他主流平台的昵称"/>
          </el-form-item>
        </el-form>
      </div>
      <div class="work_content_box box">
        <QuillEditor
          v-model:content="content"
          contentType="html"
          theme="snow"
          :options="editorOptions"
          @update:content="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 2rem auto 0 auto;
  gap: 2rem;
}
.title {
  text-align: center;
}
.work_info_box {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
}
.box {
  box-shadow: #9b9b9b 0 0 5px;
  padding: 1rem;
}
.cover_image_box {
  position: relative;
  box-shadow: #9b9b9b 0 0 5px;
  padding: 1rem;
  overflow: hidden;
  .cover_title {
    text-align: center;
  }
}
.cover_status_icon {
  position: absolute;
  font-size: 20rem;
  right: -2%;
  bottom: -15%;
  transform: rotatez(-10deg);
}
.success {
  color: #6ff96080;
}
.failed {
  color: rgba(249, 96, 96, 0.7);
}
.warning {
  color: rgba(96, 231, 249, 0.7);
}
.input_item_box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: #9b9b9b solid 1px;
  margin-bottom: 1rem;
}
.file-input {
  display: block;
  padding: 1rem 0;
  border-radius: 4px;
}
.crop_and_preview {
  display: flex;
  align-items: end;
  gap: 1rem;
  flex-wrap: wrap;
}
.crop-area {
  position: relative;
  border: 1px dashed #bc4141;
  overflow: hidden;
  width: calc(4 * 5rem);
  height: calc(3 * 5rem);
}

.crop-image {
  max-width: 100%;
  display: block;
}

.result {
  margin-top: 30px;
  text-align: center;
}

.cropped-img {
  max-width: 100%;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.cover_image_preview_box {
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 1rem;
  flex-wrap: wrap;
}
.cover_image_preview {
  overflow: hidden;
}
.w16h9 {
  width: calc(16 * 1rem);
  height: calc(9 * 1rem);
  border: #DE91A9FF 1px solid;
}
.w4h3_box {
  width: calc(4 * 3rem);
  height: calc(3 * 3rem);
  overflow: hidden;
  position: relative;
  border: #9197de 1px solid;
}
.w4h3 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1.31);
  width: calc(4 * 3rem);
  height: calc(3 * 3rem);
}
.cover_final_image {
  width: calc(16 * 1rem);
  height: calc(9 * 1rem);
}
</style>
