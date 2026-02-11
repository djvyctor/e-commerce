import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin } from '@/api/auth'
import { TOKEN_KEY } from '@/constants/auth'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(TOKEN_KEY))

    async function login(email, password) {
        const data = await apiLogin(email, password)
        const newToken = data.access_token ?? data.token ?? data
        token.value = newToken
        localStorage.setItem(TOKEN_KEY, newToken)
    }

    function logout() {
        token.value = null
        localStorage.removeItem(TOKEN_KEY)
    }

    return { token, login, logout }
})