<template>
  <div class="min-h-screen bg-gray-900">
    <Navi
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="toggleSidebar"
      @logout="handleLogout"
    />
    <Aside
      :sidebar-open="sidebarOpen"
      @logout="handleLogout"
    />

    <main class="p-4 pt-20 sm:pl-6 sm:pr-6 sm:ml-64">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Navi from './Navi.vue'
import Aside from './Aside.vue'

const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function handleLogout() {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>
