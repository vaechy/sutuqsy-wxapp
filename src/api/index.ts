import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

import AdapterUniapp from '@alova/adapter-uniapp'

export const alovaInst = createAlova({
  baseURL: import.meta.env.VITE_SERVER_BASEURL,
  ...AdapterUniapp(),
})
