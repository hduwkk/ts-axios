import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeadName: 'X-XSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  validateStatus(status: number) {
    return status >= 200 && status < 300
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
