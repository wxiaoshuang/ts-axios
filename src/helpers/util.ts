let toString = Object.prototype.toString;
export function isDate(val: any) :boolean {
  return toString.call(val) ==='[object Date]';
}
export function isObject(val: any) :boolean {
  return val !== null && typeof val === 'object'
}
export function isPlainObject(val: any) : boolean {
  return toString.call(val) ==='[object Object]';
}
