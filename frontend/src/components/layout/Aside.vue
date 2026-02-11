<template>
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
          @click="$emit('logout')"
          class="flex items-center w-full p-2 text-gray-300 rounded-lg hover:bg-gray-700 group"
        >
          <svg class="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2Z"/>
            <path d="M10 11V8H6l4-4 4 4h-4v3H6l4 4-4 4h4Z"/>
          </svg>
          <span class="ml-3">Sair</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['logout'])
</script>
