import { http } from '@/utils/http'
export interface IParseRes {
  code: string | number
  data: Record<string, string>
  error: string
  err: string
  message: string
  msg: string
}

/** GET 请求 */
export const getTest = (name: string) => {
  return http.get<any>('/', { name })
}

/** POST 请求 */
export const parseService = <T>(url: string) => {
  return http.post<T>('/parse', { url })
}
