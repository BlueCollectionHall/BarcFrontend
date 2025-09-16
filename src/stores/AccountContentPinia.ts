import {defineStore} from "pinia";
import {ref} from "vue";
import type {WorkImpl} from "@/interfaces/WorkImpl.ts";
import {baseHttp} from "@/utils/https.ts";
import type {ResponseImpl} from "@/interfaces/ResponseImpl.ts";
import {errorMessage, infoMessage} from "@/utils/MessageAlert.ts";

export const useAccountContentPinia = defineStore('account_content', () => {
  const selectedItemValue = ref<string>("works");
  const workList = ref<Array<WorkImpl>>([]);

  const fetchWorks = async (username: string) => {
    try {
      const response = await baseHttp.get("/api/work/works_by_username", {params: {status: "PUBLIC", username: username}});
      const data: ResponseImpl = response.data;
      if (data.code === 0) workList.value = data.data;
      else infoMessage(data.msg);
    } catch {
      errorMessage("网络错误！");
    }
  }
  const changeSelected = (target: string) => {
    selectedItemValue.value = target;
  }
  return {selectedItemValue, workList, fetchWorks, changeSelected}
})
