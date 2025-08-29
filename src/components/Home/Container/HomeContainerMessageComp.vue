<script setup lang="ts">
import {ArrowRightOutlined} from "@ant-design/icons-vue";
import {onMounted, ref} from "vue";
import type {MessageBoardWithUserImpl} from "@/interfaces/MessageBoardImpl.ts";
import {baseHttp} from "@/utils/https.ts";
import type {UserArchiveImpl} from "@/interfaces/UserImpl.ts";

const messageList = ref<Array<MessageBoardWithUserImpl>>([]);

const fetchMessage = (limit: number) => {
  baseHttp({
    url: "/comment/message_board/new",
    method: "GET",
    headers: {Authorization: window.localStorage.getItem('token')},
    params: {limit}
  }).then(res => {
    if (res?.data?.code === 0) {
      messageList.value = res?.data?.data;
      // console.log("messageList", res?.data?.data);
      messageList.value = messageList.value?.map(msg => ({...msg, userInfo: undefined}));
      // console.log("messageList----map", messageList.value);
      messageList.value.forEach(message => {fetchUserInfo(message.author)});
    }
  })
}

const fetchUserInfo = async (uuid: string): Promise<void> => {
  try {
    const response = await baseHttp("/user/current_by_uuid", {
      method: "GET",
      headers: {Authorization: window.localStorage.getItem('token')},
      params: {uuid}
    });
    const userInfo: UserArchiveImpl = response.data.data;
    // console.log("userInfo", userInfo);
    updateMessageUserInfo(uuid, userInfo);
  }
  catch (error) {
    console.error(`获取用户 ${uuid} 信息失败:`, error)
  }
}
const updateMessageUserInfo = (userId: string, userInfo: UserArchiveImpl): void => {
  messageList.value = messageList.value.map(msg =>
    msg.author === userId ? { ...msg, userInfo } : msg
  )
  // console.log("messageList----finish", messageList.value);
}

onMounted(() => {
  fetchMessage(3);
})
</script>

<template>
  <div class="message_board_box">
    <div style="display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem">
      <img style="width: 5rem" src="https://static.kivo.wiki/images/gallery/D2.%E6%B8%B8%E6%88%8F%E5%86%85%E6%9D%82%E9%A1%B9/Category/FX_TEX_CH0071_Prop_03.png" alt="logo"/>
      <div style="display: flex; gap: .3rem; flex-direction: column; flex: 1">
        <span style="font-size: 1.3rem; font-weight: bold; color: #fe4b7b">留言</span>
        <input id="input" type="text" placeholder="30字以内"/>
      </div>
      <button id="b"><ArrowRightOutlined /></button>
    </div>
    <div class="messages" v-if="messageList">
      <div v-for="item in messageList" :key="item.id" style="margin-top: .5rem; display: flex; align-items: center; gap: .5rem;">
        <img style="width: 3.4rem; border: #fda5bc 2px solid; border-radius: 1rem" :src="item.userInfo?.avatar || ''" alt="avatar"/>
        <div style="display: flex; flex-direction: column; gap: .3rem;">
          <span style="font-weight: bold; color: #fe4b7b">{{item.userInfo?.nickname || '123'}}</span>
          <span style="background-color: #fda5bc; padding: .3rem; border-radius: .5rem; color: white">{{item.content}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message_board_box {
  margin-top: 1rem;
}
#input {
  background-color: #ffffff80;
  border: 1px solid #fda5bc;
  height: 2rem;
  border-radius: .4rem;
}
#b {
  background-color: #fda5bc;
  border: none;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  color: white;
}
</style>
