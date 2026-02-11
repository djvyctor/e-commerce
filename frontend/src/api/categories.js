import { apiGet } from '@/infra/ApiClient'

export function getCategories() {
  return apiGet('/categories')
}
