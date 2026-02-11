<template>
  <div class="min-h-screen bg-gray-900">
    <nav class="fixed top-0 z-50 w-full bg-gray-800 border-b border-gray-700">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <button
              @click="toggleSidebar"
              aria-controls="logo-sidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <span class="sr-only">Abrir sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <a href="#" class="flex ml-2 md:mr-24">
              <div class="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-600 rounded">
                <span class="text-lg font-bold">E</span>
              </div>
              <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">Admin</span>
            </a>
          </div>

          <div class="flex items-center">
            <div class="flex items-center ml-3">
              <div ref="userMenuRef" class="relative">
                <button
                  type="button"
                  class="flex text-sm rounded-full focus:ring-4 focus:ring-gray-600"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click.stop="userMenuOpen = !userMenuOpen"
                >
                  <span class="sr-only">Menu usuário</span>
                  <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    AD
                  </div>
                </button>

                <Transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="userMenuOpen"
                    class="absolute right-0 z-[100] mt-2 w-48 text-base list-none bg-gray-800 divide-y divide-gray-700 rounded-lg shadow-lg border border-gray-700"
                  >
                    <div class="px-4 py-3" role="none">
                      <p class="text-sm text-white" role="none">Administrador</p>
                      <p class="text-sm font-medium text-gray-400 truncate" role="none">admin@admin.com</p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <router-link
                          to="/settings"
                          class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          role="menuitem"
                          @click="userMenuOpen = false"
                        >
                          Configurações
                        </router-link>
                      </li>
                      <li>
                        <button
                          @click="handleLogout"
                          class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                          role="menuitem"
                        >
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-gray-800 border-r border-gray-700 sm:translate-x-0"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-800 flex flex-col">
        <ul class="space-y-2 font-medium flex-1">
          <li>
            <router-link
              to="/dashboard"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
              active-class="bg-gray-700 text-white"
            >
              <svg class="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
              </svg>
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/products"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
              active-class="bg-gray-700 text-white"
            >
              <svg class="shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.166 16.29A2 2 0 0 0 2.152 18h13.696a2 2 0 0 0 1.986-1.708l.964-10.367ZM8 4a2 2 0 1 1 4 0v1H8V4Zm8.955 12h-1.95V14h-1.5v2H6.495V14h-1.5v2H3.045L3.955 7h10.09l.91 9Z"/>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Produtos</span>
            </router-link>
          </li>
        </ul>

        <div class="pt-4 mt-auto border-t border-gray-700">
          <button
            @click="handleLogout"
            class="flex items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
          >
            <svg class="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2Z"/>
              <path d="M10 11V8H6l4-4 4 4h-4v3H6l4 4-4-4h4Z"/>
            </svg>
            <span class="ml-3">Sair</span>
          </button>
        </div>
      </div>
    </aside>

    <main class="p-4 pt-20 sm:pl-6 sm:pr-6 sm:ml-64">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userMenuOpen = ref(false)
const sidebarOpen = ref(false)
const userMenuRef = ref(null)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function handleLogout() {
  userMenuOpen.value = false
  authStore.logout()
  router.push({ name: 'Login' })
}

function handleClickOutside(event) {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    userMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
