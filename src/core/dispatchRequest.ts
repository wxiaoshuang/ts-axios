import { AxiosRequestConfig, AxiosPromise } from '../types'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import xhr from './xhr'
function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    res.data = transformResponse(res.data)
    return res
  })
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  // 这里要先处理headers，再处理data
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
function transformUrl(config: AxiosRequestConfig): string {
  //断言url非空
  return buildUrl(config.url!, config.params)
}
function transformHeaders(config: AxiosRequestConfig) {
  // headers需要有一个默认值
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}
export default dispatchRequest
