import {isPlainObject} from './util'

export function transformRequest (data: any): any {
  // bodydata可以是: document、BodyInit: blob、buffersource、formdata、urlsearchparams、readableStream、usvstring
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
