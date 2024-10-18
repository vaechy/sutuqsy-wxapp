import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IViewData } from '@/service/index/view'
const initState = []
// interface IHistoy[] {
//   IViewData
// }
interface IHistoy extends IViewData {
  sourceURL: string
}

// f.unshift({ a: 4 })
export const useHistoryStore = defineStore(
  'history',
  () => {
    const history = ref<IHistoy[]>(initState)

    const setHistory = (val: IHistoy[]) => {
      history.value = val
    }

    const clearHistory = () => {
      history.value = initState
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      //   history.value = { ...initState }
    }
    // const isLogined = computed(() => !history.value.token)

    return {
      history,
      setHistory,
      clearHistory,
      reset,
    }
  },
  {
    persist: {
      key: 'history',
    },
  },
)
