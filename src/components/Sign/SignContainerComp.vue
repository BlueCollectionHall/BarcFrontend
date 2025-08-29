<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {baseHttp} from "@/utils/https.ts";
import type {ResponseImpl} from "@/interfaces/ResponseImpl.ts";
import {useRouter} from "vue-router";
const router = useRouter();
import {useUserPinia} from "@/stores/UserPinia.ts";
const userPinia = useUserPinia();

const itemList: Array<{label: string; value: string}> = [
  {label: "登录", value: "signin"},
  {label: "Naigos登录", value: "signin_naigos"},
  {label: "注册", value: "signup"}
]

interface SigninFormImpl {
  type: string;
  account: string;
  password: string;
}

const functionSelect = ref<string>("signin");
const signinForm = ref<SigninFormImpl>({type: "username", account: "", password: ""});

const signinFormFinish = async () => {
  try {
    const response = await baseHttp("/user/sign/in", {method: "GET", params: signinForm.value});
    const data: ResponseImpl = response.data;
    if (data.code === 0) {
      const token: string = data.data as string;
      window.localStorage.setItem("token", token);
      await userPinia.fetchUserInfo(token)
      router.back();
    }
    console.log("登录失败");
  } catch (err) {
    console.log("登录失败");
  }
}
</script>

<template>
  <div class="container">
    <div class="items">
      <a-button
        class="item"
        @click="functionSelect = item.value"
        :type="functionSelect === item.value? 'primary': 'default'"
        v-for="item in itemList"
        :key="item.value">{{item.label}}</a-button>
    </div>
    <div class="sign_in" v-if="functionSelect === 'signin'">
      <div>B.A.R.C.登录</div>
      <hr/>
      <a-form :model="signinForm"
              name="basic"
              style="width: 20rem"
              @finish="signinFormFinish"
              autocomplete="off">
        <a-form-item
          label="账号"
          name="account"
          :rules="[{ required: true, message: '输入账号，要记得选择是用什么方式登录' }]">
          <a-input v-model:value="signinForm.account"/>
        </a-form-item>
        <a-form-item label="登录方式">
          <a-radio-group v-model:value="signinForm.type">
            <a-radio value="username">用户名</a-radio>
            <a-radio value="email">邮箱</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="signinForm.password"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit">登录</a-button>
          <a-button style="background-color: darkred; color: white; border: red 1px solid; margin-left: 1rem" >忘记密码</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="sign_up" v-else-if="functionSelect === 'signup'"></div>
    <div class="sign_naigos" v-else-if="functionSelect === 'signin_naigos'"></div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100vw;
  height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.items {
  display: flex;
  gap: 1rem;
  .item {
    height: 2rem;
  }
  z-index: 1;
}
.sign_in {
  border-radius: 2rem;
  padding: 3rem;
  background-color: white;
  transform: translateY(-1rem);
}
</style>
