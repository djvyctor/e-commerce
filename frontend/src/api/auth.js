import { apiPost } from '@/services/ApiClient'

export function login(email, password) {
  return apiPost('/auth/login', { email, password })
}
