// import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types'
// import {transformRequest, transformResponse} from './helpers/data'
// import xhr from './xhr'
// import { buildURL } from './helpers/url';
// import { processHeaders } from './helpers/headers';

// function axios(config: AxiosRequestConfig): AxiosPromise {
//   processConfig(config)
//   return xhr(config).then((res) => {
//     return transformResponseData(res)
//   })
// }

// function processConfig(config: AxiosRequestConfig): void {
//   config.url = transformUrl(config)
//   config.headers = trasnformHeaders(config)
//   config.data = transformRequestData(config)
// }
// function trasnformHeaders (config: AxiosRequestConfig) {
//   const {headers = {}, data} = config
//   return processHeaders(headers, data)
// }
// function transformRequestData(config: AxiosRequestConfig) {
//   return transformRequest(config.data)
// }
// function transformResponseData(res: AxiosResponse): AxiosResponse {
//   res.data = transformResponse(res.data)
//   return res
// }
// function transformUrl(config: AxiosRequestConfig): string {
//   const {url, params} = config
//   return buildURL(url!, params)
// }

// export default axios

import {AxiosStatic, AxiosRequestConfig} from './types'
import Axios from './core/Axios'
import defaults from './defaults'
import {extend} from './helpers/util'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, {isCancel} from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  
  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
export default axios
