import {defineStore} from "pinia";
import {ref} from "vue";
import type {PageRequestImpl, PageResultImpl} from "@/interfaces/PageImpl.ts";
import type {WorkImpl} from "@/interfaces/WorkImpl.ts";
import {baseHttp} from "@/utils/https.ts";
import {errorMessage} from "@/utils/MessageAlert.ts";
import type {ResponseImpl} from "@/interfaces/ResponseImpl.ts";

export const useWorkItemListPinia = defineStore("work_item_list", () => {
  const workList = ref<Array<WorkImpl>>([]);
  const pageResult = ref<PageResultImpl<WorkImpl> | null>(null);

  /**
   * 获取作品列表以及分页返回信息
   * @param keyword 关键词
   * @param routerValue 路由值
   * @param pageRequest 分页信息
   * */
  const fetchWorkList = async (keyword: string, routerValue: string, pageRequest: PageRequestImpl) => {
    try {
      const response = await baseHttp.post("/api/work/works_by_page", pageRequest, {
        params: {
          keyword,
          type: routerValue,
        }
      });
      const data: ResponseImpl = response.data;
      if (data.code === 0) {
        pageResult.value = data.data;
        workList.value = pageResult.value?.list || [];
      }
    } catch (error) {
      console.error(error);
      errorMessage("获取作品信息时出现网络问题");
    }
  }

  return {workList, pageResult, fetchWorkList};
});
