const DEFAULT_API_BASE_URL = 'https://api.escuelajs.co/api/v1'

function getEnv(key, fallback = '') {
  const value = import.meta.env[key]
  return value !== undefined && value !== '' ? value : fallback
}

export const env = {
  apiBaseUrl: getEnv('VITE_API_BASE_URL', DEFAULT_API_BASE_URL)
}

export function assertEnv() {
  const url = env.apiBaseUrl
  if (!url || typeof url !== 'string') {
    throw new Error('VITE_API_BASE_URL is required. Copy .env.example to .env and set the variable.')
  }
  try {
    new URL(url)
  } catch {
    throw new Error('VITE_API_BASE_URL must be a valid URL.')
  }
}
