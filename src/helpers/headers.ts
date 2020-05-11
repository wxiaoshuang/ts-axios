/**
 * 处理请求头
 *
 */
import { isPlainObject } from './util'
const CONTENT_TYPE = 'Content-Type'
// normalize 请求头名称
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, CONTENT_TYPE)
  // 如果data是plainObject,并且headers存在并且Content-Type没有配置，那么需要配置成application/json
  if (isPlainObject(data)) {
    if (headers && !headers[CONTENT_TYPE]) {
      headers[CONTENT_TYPE] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
// 解析返回的headers格式，string -> object
export function parseHeaders(headers: string): any {
  let obj = Object.create(null)
  if (!headers) return obj
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    if (!key) return
    if (val) val = val.trim()
    obj[key] = val
  })
  return obj
}
