export type Method =
  | 'GET'
  | 'get'
  | 'POST'
  | 'post'
  | 'PUT'
  | 'put'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'PATCH'
  | 'patch'
export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: any
  data?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  config: AxiosRequestConfig
  headers: any
  request: any
}
export interface AxiosPromise extends Promise<AxiosResponse> {}
// 错误信息增强
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response: AxiosResponse
}
