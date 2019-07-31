import {isPlainObject} from './util'
const CONTENT_TYPE = 'Content-Type';
function normalizeHeaderName(headers: any, normalizedName: string) : void {
  if(!headers) {
    return;
  }
  Object.keys(headers).forEach(name => {
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  })
}
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, CONTENT_TYPE);
  if(isPlainObject(data)) {
    if(headers && !headers[CONTENT_TYPE]) {
      headers[CONTENT_TYPE] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}
// 解析返回的headers格式
export function parseHeaders(headers: string): void{

}
