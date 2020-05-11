// 处理url参数,分为以下几种情况
// 参数是数组的情况 params: {foo: ['A', 'b']} => foo[]=a&foo[]=b
// 参数是对象 params: {a: 1, b: null}
// key的值是undefined或者null，那么就不拼接在url中
import { isDate, isObject } from './util'
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/g, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/g, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
}
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val == null) {
      return // 不会退出循环，只会退出本轮
    }
    let values = []
    if (Array.isArray(val)) {
      values.push(val)
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  // url的hash部分去掉
  let index = url.indexOf('#')
  if (index > -1) {
    url = url.slice(0, index)
  }
  url += (url.indexOf('?') > -1 ? '&' : '?') + serializedParams
  return url
}
