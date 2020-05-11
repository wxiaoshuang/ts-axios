import { AxiosRequestConfig, AxiosPromise } from './types/index'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  // 这里要先处理headers，再处理data
  config.headers = transfromHeaders(config)
  config.data = transformRequestData(config)
}
function transformUrl(config: AxiosRequestConfig): string {
  return buildUrl(config.url, config.params)
}
function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}
function transfromHeaders(config: AxiosRequestConfig) {
  // headers需要有一个默认值
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
