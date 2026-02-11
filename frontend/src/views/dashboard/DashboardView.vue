<template>
  <div class="min-h-screen bg-gray-900 p-4">
    <div v-if="loading" class="flex h-screen items-center justify-center">
      <div class="flex items-center gap-3">
        <svg class="h-6 w-6 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-sm font-medium text-gray-400">Carregando dados...</span>
      </div>
    </div>

    <div v-else-if="errorMessage" class="rounded-lg bg-red-900/30 border border-red-800 p-4 text-sm text-red-300" role="alert">
      <span class="font-medium">Erro!</span> {{ errorMessage }}
    </div>

    <template v-else>
      <div class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <nav class="mb-1 flex text-gray-400" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center text-sm font-medium hover:text-white">
                <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Home
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">E-commerce</span>
                </div>
              </li>
            </ol>
          </nav>
          <h1 class="text-xl font-semibold text-white sm:text-2xl">Dashboard de Vendas</h1>
        </div>
        <div class="flex space-x-3">
          <router-link
            to="/products"
            class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
            Novo Produto
          </router-link>
        </div>
      </div>

      <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
          <div class="flex items-center justify-between">
            <div class="shrink-0">
              <span class="text-2xl font-bold leading-none text-white sm:text-3xl">{{ totalProducts }}</span>
              <h3 class="text-base font-normal text-gray-400">Produtos Totais</h3>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/50 text-blue-400">
               <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v1H5.8a1.6 1.6 0 00-1.6 1.6v10.8a1.6 1.6 0 001.6 1.6h8.4a1.6 1.6 0 001.6-1.6V8.6a1.6 1.6 0 00-1.6-1.6H14V6a4 4 0 00-4-4z"></path></svg>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
          <div class="flex items-center justify-between">
            <div class="shrink-0">
              <span class="text-2xl font-bold leading-none text-white sm:text-3xl">{{ totalCategories }}</span>
              <h3 class="text-base font-normal text-gray-400">Categorias Ativas</h3>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-900/50 text-teal-400">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
          <div class="flex items-center justify-between">
            <div class="shrink-0">
              <span class="text-2xl font-bold leading-none text-white sm:text-3xl">${{ averagePrice }}</span>
              <h3 class="text-base font-normal text-gray-400">Ticket Médio</h3>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900/50 text-purple-400">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
          <div class="flex items-center justify-between">
            <div class="shrink-0">
              <span class="text-2xl font-bold leading-none text-white sm:text-3xl">${{ totalInventoryValue }}</span>
              <h3 class="text-base font-normal text-gray-400">Valor Total do Inventário</h3>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-900/50 text-green-400">
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="mb-3">
          <h3 class="text-base font-semibold text-white">Distribuição por Categoria</h3>
          <span class="text-sm font-normal text-gray-400">Mesmo dado em duas visualizações</span>
        </div>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
            <div class="mb-4 border-b border-gray-700 pb-3">
              <span class="text-sm font-medium text-gray-300">Visual 1 — Barras</span>
            </div>
            <div v-if="chartData.labels?.length" class="h-80 w-full">
              <BarChart :chart-data="chartData" />
            </div>
            <div v-else class="flex h-64 items-center justify-center text-gray-500">
              Sem dados para exibir
            </div>
          </div>
          <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
            <div class="mb-4 border-b border-gray-700 pb-3">
              <span class="text-sm font-medium text-gray-300">Visual 2 — Donut</span>
            </div>
            <div v-if="chartData.labels?.length" class="h-80 w-full">
              <DonutChart :chart-data="donutChartData" />
            </div>
            <div v-else class="flex h-64 items-center justify-center text-gray-500">
              Sem dados para exibir
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
        <div class="mb-4 border-b border-gray-700 pb-4">
          <h3 class="text-base font-semibold text-white">Distribuição por Faixas de Preço</h3>
          <span class="text-sm font-normal text-gray-400">Quantidade de produtos em cada faixa ($)</span>
        </div>
        <div v-if="priceRangesChartData.labels?.length" class="h-72 w-full">
          <WaveChart :chart-data="priceRangesChartData" />
        </div>
        <div v-else class="flex h-64 items-center justify-center text-gray-500">
          Sem dados para exibir
        </div>
      </div>

      <div class="mb-4">
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-white">Top 5 Produtos por Valor</h3>
          <span class="text-sm font-normal text-gray-400">Os 5 produtos com maior preço — duas visualizações</span>
        </div>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
            <div class="mb-4 border-b border-gray-700 pb-3">
              <span class="text-sm font-medium text-gray-300">Visual 1 — Barras horizontais</span>
            </div>
            <div v-if="top5ChartData.labels?.length" class="h-64 w-full">
              <BarChart :chart-data="top5ChartData" :horizontal="true" />
            </div>
            <div v-else class="flex h-64 items-center justify-center text-gray-500">
              Sem dados para exibir
            </div>
          </div>
          <div class="rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
            <div class="mb-4 border-b border-gray-700 pb-3">
              <span class="text-sm font-medium text-gray-300">Visual 2 — Barras verticais</span>
            </div>
            <div v-if="top5ChartData.labels?.length" class="h-64 w-full">
              <BarChart :chart-data="top5ChartData" />
            </div>
            <div v-else class="flex h-64 items-center justify-center text-gray-500">
              Sem dados para exibir
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
          <div class="border-b border-gray-700 px-4 py-4 sm:px-6">
            <h3 class="text-lg font-semibold text-white">Produtos Cadastrados Recentemente</h3>
            <span class="text-sm font-normal text-gray-400">Últimos 5 produtos pelo ID</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-400">
              <thead class="bg-gray-700/50 text-xs uppercase text-gray-300">
                <tr>
                  <th scope="col" class="px-4 py-3">Produto</th>
                  <th scope="col" class="px-4 py-3">Categoria</th>
                  <th scope="col" class="px-4 py-3 text-right">Preço</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in recentProducts" :key="p.id" class="border-b border-gray-700 hover:bg-gray-700/30">
                  <td class="whitespace-nowrap px-4 py-3 font-medium text-white">
                    <span class="truncate block max-w-[180px]">{{ p.title }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="rounded bg-blue-900/50 px-2.5 py-0.5 text-xs font-medium text-blue-300">
                        {{ p.category?.name || 'Geral' }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right text-white">${{ p.price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProducts } from '@/api/products'
import { getCategories } from '@/api/categories'
import BarChart from '@/components/common/BarChart.vue'
import DonutChart from '@/components/common/DonutChart.vue'
import WaveChart from '@/components/common/WaveChart.vue'

const products = ref([])
const categories = ref([])
const loading = ref(true)
const errorMessage = ref('')

const totalProducts = computed(() => products.value.length)
const totalCategories = computed(() => categories.value.length)
const averagePrice = computed(() => {
  if (!products.value.length) return '0.00'
  const sum = products.value.reduce((s, p) => s + p.price, 0)
  return (sum / products.value.length).toFixed(2)
})
const totalInventoryValue = computed(() => {
  const sum = products.value.reduce((s, p) => s + p.price, 0)
  return sum.toFixed(2)
})
const top5ByPrice = computed(() =>
  [...products.value].sort((a, b) => b.price - a.price).slice(0, 5)
)
const recentProducts = computed(() =>
  [...products.value].sort((a, b) => b.id - a.id).slice(0, 5)
)
const CATEGORY_COLORS = ['#1A56DB', '#0D9488', '#7C3AED', '#EA580C', '#DC2626', '#16A34A', '#0891B2', '#4F46E5']
const chartData = computed(() => {
  const byCategory = {}
  for (const p of products.value) {
    const name = p.category?.name ?? `Categoria ${p.category?.id ?? '?'}`
    byCategory[name] = (byCategory[name] ?? 0) + 1
  }
  const labels = Object.keys(byCategory)
  return {
    labels,
    datasets: [{ 
        label: 'Produtos', 
        data: Object.values(byCategory),
        backgroundColor: labels.map((_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length]), 
        borderRadius: 4
    }]
  }
})

const donutChartData = computed(() => chartData.value)

const PRICE_RANGES = [
  { label: '$0 - $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200+', min: 200, max: 1e9 }
]
const priceRangesChartData = computed(() => {
  const counts = PRICE_RANGES.map(range => 
    products.value.filter(p => p.price >= range.min && p.price < range.max).length
  )
  return {
    labels: PRICE_RANGES.map(r => r.label),
    datasets: [{
      label: 'Produtos',
      data: counts,
      borderColor: '#1A56DB',
      backgroundColor: 'rgba(26, 86, 219, 0.1)',
      fill: true,
      tension: 0.3
    }]
  }
})

const TOP5_COLORS = ['#1A56DB', '#0D9488', '#7C3AED', '#EA580C', '#DC2626']
const top5ChartData = computed(() => {
  const top5 = top5ByPrice.value
  return {
    labels: top5.map(p => p.title.length > 25 ? p.title.slice(0, 25) + '...' : p.title),
    datasets: [{
      label: 'Preço ($)',
      data: top5.map(p => p.price),
      backgroundColor: top5.map((_, i) => TOP5_COLORS[i % TOP5_COLORS.length]),
      borderRadius: 4
    }]
  }
})

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      getProducts({ limit: 200, offset: 0 }),
      getCategories()
    ])
    products.value = Array.isArray(productsRes) ? productsRes : []
    categories.value = Array.isArray(categoriesRes) ? categoriesRes : []
  } catch (err) {
    errorMessage.value = err.message || 'Erro ao carregar dados'
  } finally {
    loading.value = false
  }
})
</script>