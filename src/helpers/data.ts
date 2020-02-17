import {isPlainObject} from './util'

export function transformRequest (data: any): any {
  // bodydata可以是: document、BodyInit: blob、buffersource、formdata、urlsearchparams、readableStream、usvstring
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  console.log(data, 'data .. ..')
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      console.error(e)
    }
  }
  return data
}
