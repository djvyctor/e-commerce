import { apiGet } from '@/services/ApiClient'

export function getCategories() {
  return apiGet('/categories')
}
