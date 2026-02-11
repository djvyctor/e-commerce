import { apiGet, apiPost, apiPut, apiDelete } from '@/services/ApiClient'

const DEFAULT_IMAGE_URL = 'https://placehold.co/400'

function ensureImages(images) {
  const list = Array.isArray(images) ? images.filter(Boolean) : []
  return list.length ? list : [DEFAULT_IMAGE_URL]
}

function parsePriceFilter(value) {
  if (value == null || value === '') return null
  const n = Number(value)
  return !Number.isNaN(n) && n >= 0 ? n : null
}

export function getProducts(params = {}) {
  const { offset = 0, limit = 10, title, price_min, price_max, categoryId } = params
  let numMin = parsePriceFilter(price_min)
  let numMax = parsePriceFilter(price_max)
  if (numMin != null && numMax != null && numMin > numMax) {
    ;[numMin, numMax] = [numMax, numMin]
  }
  return apiGet('/products', {
    params: {
      offset,
      limit,
      ...(title && { title }),
      ...(numMin != null && { price_min: numMin }),
      ...(numMax != null && { price_max: numMax }),
      ...(categoryId != null && { categoryId })
    }
  })
}

export function createProduct(data) {
  return apiPost('/products', {
    title: data.title,
    price: data.price,
    description: data.description ?? '',
    categoryId: data.categoryId,
    images: ensureImages(data.images)
  })
}

export function updateProduct(id, data) {
  return apiPut(`/products/${id}`, {
    title: data.title,
    price: data.price,
    description: data.description ?? '',
    categoryId: data.categoryId,
    images: ensureImages(data.images)
  })
}

export function deleteProduct(id) {
  return apiDelete(`/products/${id}`)
}
