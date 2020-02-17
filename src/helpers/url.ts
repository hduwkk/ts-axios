import {isDate, isPlainObject} from './util'
import { isObject } from 'util';

function encode (val: string): string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/gi, ']')
}

// 数组: /base/get?foo[]=bar&foo[]=baz'
// 对象: /base/get?foo=%7B%22bar%22:%22baz%22%7D
// date: /base/get?date=2019-04-01T05:55:39.030Z
// 特殊字符: @:$,+[]
// 空值忽略
// 丢弃url中的哈希标记
// 保留url中已存在的参数
export function buildURL(url: string, params?: any) {
  if (!params) return url
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') return
    let values: string[]
    if (Array.isArray(val)) {
      values = val
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

  let serizlizedParams = parts.join('&')
  if (serizlizedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serizlizedParams
  }
  return url
}
