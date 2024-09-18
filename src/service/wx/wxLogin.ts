import { http } from '@/utils/http'
import { Ref } from 'vue'
/* #ifdef MP-WEIXIN */
// App端特有的逻辑
const apiUrl = '/index.php?s=/api/user/login'
/* #endif */

/* #ifdef H5 */
// App端特有的逻辑
// eslint-disable-next-line @typescript-eslint/no-redeclare
const apiUrl = '/api/index.php?s=/api/user/login'
/* #endif */
const wxappId = '10001'
export interface IResData {
  code: number
  data: { token: string }
  msg: string
}
export interface IReqParams {
  code: string
}
/** GET 请求 */
// export const getFooAPI = (name: string) => {
//   return http.get<IFooItem>('/foo', { name })
// }

/** POST 请求 */
export const postGetTokenAPI = <D, B, Q>(body?: B, query?: any) => {
  // App端特有的逻辑
  return http.post<D>(apiUrl, { ...body, wxapp_id: wxappId })
}
