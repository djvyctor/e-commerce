import { HttpClient } from '@/infra/HttpClient'
import { env } from '@/config/env'

const httpClient = new HttpClient(env.apiBaseUrl)

export const apiGet = (endpoint, options = {}) => httpClient.get(endpoint, options)

export const apiPost = (endpoint, data, options = {}) => httpClient.post(endpoint, data ?? {}, options)

export const apiPut = (endpoint, data, options = {}) => httpClient.put(endpoint, data ?? {}, options)

export const apiPatch = (endpoint, data, options = {}) => httpClient.patch(endpoint, data ?? {}, options)

export const apiDelete = (endpoint, options = {}) => httpClient.delete(endpoint, options)
