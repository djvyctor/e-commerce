import { ref, onUnmounted } from 'vue'

export function useDebounceFn(fn, delay) {
  const timeoutId = ref(null)

  function debounced(...args) {
    if (timeoutId.value != null) clearTimeout(timeoutId.value)
    timeoutId.value = setTimeout(() => {
      fn(...args)
      timeoutId.value = null
    }, delay)
  }

  onUnmounted(() => {
    if (timeoutId.value != null) clearTimeout(timeoutId.value)
  })

  return debounced
}
