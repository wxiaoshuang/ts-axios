// 处理url参数,分为以下几种情况
// 参数是数组的情况 params: {foo: ['A', 'b']} => foo[]=a&foo[]=b
import {isDate, isObject} from './util'
export function buildUrl(url: string, params?:any): string {
  if(!params) {
    return url;
  }
  const parts: string[] = [];
  Object.keys(params).forEach((key) => {
    let val = params[key];
    let parts = [];
    if(Array.isArray(val)) {

    }

  })

}

