import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from '../types'
import {transformRequest, transformResponse} from '../helpers/data'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = trasnformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildURL(url!, params)
}

function trasnformHeaders (config: AxiosRequestConfig) {
  const {headers = {}, data} = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
