import { TOKEN_KEY } from '@/constants/auth'

export class HttpClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL
  }

  buildUrl(endpoint, params = {}) {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`)
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== '') url.searchParams.set(key, String(value))
    })
    return url.toString()
  }

  getHeaders(useAuth = false) {
    const headers = { 'Content-Type': 'application/json' }
    if (useAuth) {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) headers.Authorization = `Bearer ${token}`
    }
    return headers
  }

  async get(endpoint, options = {}) {
    const { params = {} } = options
    const url = this.buildUrl(endpoint, params)
    const response = await fetch(url, { method: 'GET', headers: this.getHeaders(false) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.message || `Erro ${response.status}`)
    return data
  }

  async post(endpoint, data = {}, options = {}) {
    const url = this.buildUrl(endpoint)
    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(data)
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.message || `Erro ${response.status}`)
    return result
  }

  async put(endpoint, data = {}, options = {}) {
    const url = this.buildUrl(endpoint)
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(data)
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.message || `Erro ${response.status}`)
    return result
  }

  async patch(endpoint, data = {}, options = {}) {
    const url = this.buildUrl(endpoint)
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(true),
      body: JSON.stringify(data)
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.message || `Erro ${response.status}`)
    return result
  }

  async delete(endpoint, options = {}) {
    const url = this.buildUrl(endpoint)
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(true)
    })
    if (!response.ok) {
      const result = await response.json().catch(() => ({}))
      throw new Error(result.message || `Erro ${response.status}`)
    }
    if (response.status === 204) return null
    return response.json().catch(() => ({}))
  }
}
