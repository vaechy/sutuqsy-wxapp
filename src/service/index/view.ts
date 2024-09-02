import { http } from '@/utils/http'

/* #ifdef MP-WEIXIN */
// App端特有的逻辑
const apiUrl = '/index.php?s=/api/video/getInfo'
/* #endif */

/* #ifdef H5 */
// App端特有的逻辑
// eslint-disable-next-line @typescript-eslint/no-redeclare
const apiUrl = '/api/index.php?s=/api/video/getInfo'
/* #endif */
export interface IResViewData {
  video: string
  image: string
}
export interface IReqParams {
  url: string
  token: string
  wxapp_id: string
}
/** GET 请求 */
// export const getFooAPI = (name: string) => {
//   return http.get<IFooItem>('/foo', { name })
// }

/** POST 请求 */
export const postAnalyzeAPI = <D, B, Q>(body?: B, query?: any) => {
  // App端特有的逻辑
  return http.post<D>(apiUrl, body)
}
