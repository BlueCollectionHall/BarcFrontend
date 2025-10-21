import {defineStore} from "pinia";
import {ref} from "vue";
import type {UserArchiveImpl, UserBasicImpl} from "@/interfaces/UserImpl.ts";
import {baseHttp} from "@/utils/https.ts";
import type {ResponseImpl} from "@/interfaces/ResponseImpl.ts";

export const useUserPinia = defineStore('user', () => {
  const userArchive = ref<UserArchiveImpl | null>(null);
  const userBasic = ref<UserBasicImpl | null>(null);

  const fetchUserInfo = async (token: string) => {
    try {
      const responseArchive = await baseHttp(
        "/user/current_me",
        {
          headers: {
            Authorization: token
          }
        });
      const responseBasic = await baseHttp(
        "/user/basic_me",
        {
          headers: {
            Authorization: token
          }
        });
      const dataArchive: ResponseImpl = responseArchive.data;
      const dataBasic: ResponseImpl = responseBasic.data;
      if (dataArchive.code === 0 && dataBasic.code === 0) {
        userArchive.value = dataArchive.data;
        userBasic.value = dataBasic.data;
      }
      return;
    } catch {
      window.localStorage.removeItem("token");
      console.log("fetchUserInfo在Pinia中错误");
      return;
    }
  }

  return {userArchive, userBasic, fetchUserInfo}
})
