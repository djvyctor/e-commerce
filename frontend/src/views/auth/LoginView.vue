<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-900">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white">
      <div class="w-8 h-8 mr-2 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
        E
      </div>
      E-commerce Admin
    </a>

    <div class="w-full bg-gray-800 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
          Entre na sua conta
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-300">Seu email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              class="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="nome@empresa.com"
              required
            />
          </div>

          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-300">Senha</label>
            <input
              id="password"
              v-model="password"
              type="password"
              name="password"
              placeholder="••••••••"
              class="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div class="flex items-center">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-blue-600"
              />
            </div>
            <label for="remember" class="ml-3 text-sm text-gray-400">Lembrar-me</label>
          </div>

          <div v-if="errorMessage" class="p-3 text-sm text-red-300 rounded-lg bg-red-900/30 border border-red-800" role="alert">
            <span class="font-medium">Erro:</span> {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleSubmit() {
  errorMessage.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    password.value = ''
    router.push({ name: 'Dashboard' })
  } catch (err) {
    errorMessage.value = err.message || 'Falha na autenticação. Verifique suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>
