/**
 * 处理请求体数据和响应体数据
 */
import { isPlainObject } from './util'
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
// 响应数据类型如果是string,转换成对象
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.log(e)
    }
  }
  return data
}
