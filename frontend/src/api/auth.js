import { apiPost } from '@/infra/ApiClient'

export function login(email, password) {
  return apiPost('/auth/login', { email, password })
}
