import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IViewData } from '@/service/index/view'
const initState = { nickname: '', avatar: '' }

export const useViewStore = defineStore(
  'view',
  () => {
    const viewDate = ref<IViewData>(null)

    const setViewData = (val: IViewData) => {
      viewDate.value = val
    }

    const clearViewData = () => {
      //   userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      //   userInfo.value = { ...initState }
    }
    // const isLogined = computed(() => !!userInfo.value.token)

    return {
      viewDate,
      setViewData,
      clearViewData,
      reset,
      //   isLogined,
    }
  },
  {
    persist: false,
  },
)
