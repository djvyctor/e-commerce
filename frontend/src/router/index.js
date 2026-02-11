import { createRouter, createWebHistory } from 'vue-router'
import { TOKEN_KEY } from '@/constants/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/components/layout/AuthLayout.vue'),
      meta: { requiresAuth: false },
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/auth/LoginView.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/components/layout/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: { name: 'Dashboard' }
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue')
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/products/ProductsView.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/settings/SettingsView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Dashboard' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(TOKEN_KEY)
  const requiresAuth = to.matched.some((r) => r.meta.requiresAuth)

  if (requiresAuth && !token) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && token) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router