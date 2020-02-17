import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import {parseHeaders} from './helpers/headers'
import { resolve } from 'path';
import { rejects } from 'assert';
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) request.responseType = responseType
    if (timeout) request.timeout = timeout
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      // console.log(request.getAllResponseHeaders())
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // console.log(responseHeaders)
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Resquest failed with status code ${response.status}`))
      }
    }

    request.onerror = function handleError() {
      reject(new Error('NetWork Error!!'))
    }
    request.ontimeout = function hadnleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded!!`))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
