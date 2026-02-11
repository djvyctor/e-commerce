<template>
  <div class="min-h-screen bg-gray-900 p-4">
    <div class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <nav class="mb-1 flex text-gray-400" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center text-sm font-medium hover:text-white">
              <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Home
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="h-6 w-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <span class="ml-1 text-sm font-medium text-gray-400 md:ml-2">Produtos</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 class="text-xl font-semibold text-white sm:text-2xl">Todos os Produtos</h1>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        @click="openCreate"
      >
        <svg class="-ml-1 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Adicionar produto
      </button>
    </div>

    <div class="mb-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="relative w-full lg:w-64">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input
            v-model="filters.title"
            type="text"
            class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 pl-10 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Buscar produtos"
            @input="onFilterChange"
          />
        </div>

        <div class="flex flex-wrap items-center gap-3">
           <div class="flex items-center gap-2">
            <label class="sr-only" for="filter-price-min">Preço mínimo ($)</label>
            <input
              id="filter-price-min"
              v-model.number="filters.price_min"
              type="number"
              min="0"
              step="any"
              placeholder="Mín $"
              class="block w-24 rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              @input="onFilterChange"
            />
            <span class="text-gray-400" aria-hidden="true">–</span>
            <label class="sr-only" for="filter-price-max">Preço máximo ($)</label>
            <input
              id="filter-price-max"
              v-model.number="filters.price_max"
              type="number"
              min="0"
              step="any"
              placeholder="Máx $"
              class="block w-24 rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              @input="onFilterChange"
            />
          </div>
          <select
            v-model="filters.categoryId"
            class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:w-48"
            @change="onFilterChange"
          >
            <option :value="null">Todas categorias</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>

          <button
            v-if="hasActiveFilters"
            type="button"
            class="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200"
            @click="clearFilters"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>

    <div v-if="successMessage" class="mb-4 rounded-lg bg-green-900/30 border border-green-800 p-4 text-sm text-green-300" role="alert">
      <span class="font-medium">Sucesso!</span> {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mb-4 rounded-lg bg-red-900/30 border border-red-800 p-4 text-sm text-red-300" role="alert">
      <span class="font-medium">Erro!</span> {{ errorMessage }}
    </div>

    <div class="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
      <div v-if="loading" class="flex justify-center py-12">
        <svg class="h-8 w-8 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <template v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700 text-left text-sm text-gray-400">
            <thead class="bg-gray-700/50 text-xs uppercase text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium">Produto</th>
                <th scope="col" class="px-6 py-4 font-medium">Categoria</th>
                <th scope="col" class="px-6 py-4 font-medium text-right">Preço</th>
                <th scope="col" class="px-6 py-4 text-center font-medium">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700 bg-gray-800">
              <tr v-for="p in products" :key="p.id" class="hover:bg-gray-700/50">
                <td class="whitespace-nowrap px-6 py-4 font-medium text-white">
                  <div class="flex items-center gap-4">
                    <img
                      :src="p.images?.[0] || 'https://placehold.co/64'"
                      :alt="p.title"
                      class="h-10 w-10 shrink-0 rounded border border-gray-600 object-cover"
                    />
                    <div class="flex flex-col">
                      <span class="font-semibold text-white">{{ p.title }}</span>
                      <span class="text-xs text-gray-400">ID: {{ p.id }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center rounded bg-blue-900/50 px-2.5 py-0.5 text-xs font-medium text-blue-300">
                    {{ p.category?.name ?? 'Sem Categoria' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right font-semibold text-white">
                  ${{ p.price }}
                </td>
                <td class="px-6 py-4 text-center">
                   <div class="relative inline-block text-left">
                    <button
                      type="button"
                      class="inline-flex items-center rounded-lg p-2 text-sm font-medium text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                      @click.stop="toggleActionMenu(p.id)"
                    >
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </button>
                    <div
                      v-if="actionMenuId === p.id"
                      class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-lg bg-gray-800 shadow-lg ring-1 ring-gray-700 border border-gray-700 focus:outline-none"
                    >
                      <div class="py-1">
                        <button
                          class="flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          @click="openEdit(p); actionMenuId = null"
                        >
                          <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 012 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                          Editar
                        </button>
                        <button
                          class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          :disabled="deleteLoadingId === p.id"
                          @click="confirmDelete(p); actionMenuId = null"
                        >
                          <svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                          {{ deleteLoadingId === p.id ? 'Deletando...' : 'Deletar' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="products.length === 0" class="bg-gray-800">
                <td colspan="4" class="py-8 text-center text-gray-400">
                  Nenhum produto encontrado com estes filtros.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between border-t border-gray-700 bg-gray-800 px-4 py-3 sm:px-6">
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-300">
                Página <span class="font-medium">{{ page }}</span>
              </p>
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  type="button"
                  class="relative inline-flex items-center rounded-l-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 focus:z-20 disabled:opacity-50"
                  :disabled="page <= 1"
                  @click="goPage(page - 1)"
                >
                  <span class="sr-only">Anterior</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </button>
                <button
                  type="button"
                  class="relative inline-flex items-center rounded-r-md border border-gray-600 bg-gray-800 px-2 py-2 text-sm font-medium text-gray-400 hover:bg-gray-700 focus:z-20 disabled:opacity-50"
                  :disabled="products.length < limit"
                  @click="goPage(page + 1)"
                >
                  <span class="sr-only">Próxima</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div
      v-if="formOpen"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50 backdrop-blur-sm px-4"
      @click.self="closeForm"
    >
      <div class="relative w-full max-w-2xl rounded-xl bg-gray-800 border border-gray-700 p-6 shadow-2xl transition-all" @click.stop>
        <div class="mb-4 flex items-center justify-between border-b border-gray-700 pb-4">
          <h3 class="text-xl font-semibold text-white">
            {{ editingProduct ? 'Editar produto' : 'Adicionar produto' }}
          </h3>
          <button @click="closeForm" class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-white">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>

        <div class="grid gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-medium text-white">Nome do Produto</label>
            <input
              v-model="form.title"
              class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: Apple iMac 27"
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-white">Categoria</label>
            <select
              v-model="form.categoryId"
              class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            >
              <option :value="null">Selecione...</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-white">Preço ($)</label>
            <input
              v-model.number="form.price"
              type="number"
              class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ex: 2999"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-medium text-white">Descrição</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Escreva uma descrição do produto..."
            />
          </div>
        </div>

        <div class="mt-6 flex items-center space-x-2 border-t border-gray-700 pt-6">
          <button
            type="button"
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            :disabled="submitLoading"
            @click="submitForm"
          >
            {{ submitLoading ? 'Salvando...' : (editingProduct ? 'Atualizar' : 'Criar') }}
          </button>
          <button
            type="button"
            class="rounded-lg border border-gray-600 bg-gray-700 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-600"
            :disabled="submitLoading"
            @click="closeForm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="deleteConfirmProduct"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50 backdrop-blur-sm px-4"
      @click.self="deleteConfirmProduct = null"
    >
      <div class="relative w-full max-w-md rounded-lg bg-gray-800 border border-gray-700 p-4 text-center shadow sm:p-5" @click.stop>
        <button @click="deleteConfirmProduct = null" class="absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-700 hover:text-white">
             <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <svg class="mx-auto mb-3.5 h-11 w-11 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        <p class="mb-4 text-gray-300">
          Tem certeza que deseja excluir o produto <strong>{{ deleteConfirmProduct?.title }}</strong>? Essa ação não pode ser desfeita.
        </p>
        <div class="flex items-center justify-center space-x-4">
          <button
            type="button"
            class="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-600"
            @click="deleteConfirmProduct = null"
          >
            Não, cancelar
          </button>
          <button
            type="button"
            class="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            :disabled="deleteLoadingId === deleteConfirmProduct?.id"
            @click="doDelete"
          >
            Sim, tenho certeza
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDebounceFn } from '@/composables/useDebounceFn'
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/api/products'
import { getCategories } from '@/api/categories'

const products = ref([])
const categories = ref([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const submitLoading = ref(false)
const deleteLoadingId = ref(null)
const actionMenuId = ref(null)
const deleteConfirmProduct = ref(null)
const page = ref(1)
const limit = 10
const filters = ref({
  title: '',
  price_min: null,
  price_max: null,
  categoryId: null
})
const editingProduct = ref(null)
const formOpen = ref(false)
const form = ref({ title: '', price: 0, description: '', categoryId: null, images: [] })

const SUCCESS_DURATION = 3000
const FILTER_DEBOUNCE_MS = 400

const hasActiveFilters = computed(() => {
  const f = filters.value
  return (
    (f.title && f.title.trim() !== '') ||
    (f.price_min != null && f.price_min !== '') ||
    (f.price_max != null && f.price_max !== '') ||
    f.categoryId != null
  )
})

function toggleActionMenu(id) {
  actionMenuId.value = actionMenuId.value === id ? null : id
}

function clearMessages() {
  errorMessage.value = ''
  successMessage.value = ''
}

function setSuccess(msg) {
  successMessage.value = msg
  errorMessage.value = ''
  setTimeout(() => {
    successMessage.value = ''
  }, SUCCESS_DURATION)
}

async function fetchProducts() {
  loading.value = true
  errorMessage.value = ''
  try {
    const offset = (page.value - 1) * limit
    const data = await getProducts({
      offset,
      limit,
      title: filters.value.title || undefined,
      price_min: filters.value.price_min,
      price_max: filters.value.price_max,
      categoryId: filters.value.categoryId ?? undefined
    })
    products.value = Array.isArray(data) ? data : []
  } catch (err) {
    errorMessage.value = err.message || 'Erro ao carregar produtos'
  } finally {
    loading.value = false
  }
}

const debouncedFetch = useDebounceFn(() => {
  page.value = 1
  fetchProducts()
}, FILTER_DEBOUNCE_MS)

function onFilterChange() {
  debouncedFetch()
}

function clearFilters() {
  filters.value = {
    title: '',
    price_min: null,
    price_max: null,
    categoryId: null
  }
  page.value = 1
  fetchProducts()
}

function goPage(p) {
  page.value = p
  fetchProducts()
}

async function loadCategories() {
  try {
    categories.value = await getCategories()
  } catch (_) {}
}

function openCreate() {
  editingProduct.value = null
  form.value = { title: '', price: 0, description: '', categoryId: null, images: [] }
  formOpen.value = true
  clearMessages()
  actionMenuId.value = null
}

function openEdit(p) {
  editingProduct.value = p
  form.value = {
    title: p.title,
    price: p.price,
    description: p.description ?? '',
    categoryId: p.category?.id ?? p.categoryId ?? null,
    images: Array.isArray(p.images) ? [...p.images] : []
  }
  formOpen.value = true
  clearMessages()
}

function closeForm() {
  formOpen.value = false
  editingProduct.value = null
}

function validateForm() {
  const t = String(form.value.title ?? '').trim()
  if (!t) {
    errorMessage.value = 'Título é obrigatório'
    return false
  }
  const price = Number(form.value.price)
  if (Number.isNaN(price) || price < 0) {
    errorMessage.value = 'Preço inválido'
    return false
  }
  if (form.value.categoryId == null && !editingProduct.value) {
    errorMessage.value = 'Selecione uma categoria'
    return false
  }
  return true
}

async function submitForm() {
  if (!validateForm()) return
  submitLoading.value = true
  clearMessages()
  try {
    if (editingProduct.value) {
      await updateProduct(editingProduct.value.id, form.value)
      setSuccess('Produto atualizado com sucesso.')
    } else {
      await createProduct(form.value)
      setSuccess('Produto criado com sucesso.')
    }
    closeForm()
    await fetchProducts()
  } catch (err) {
    errorMessage.value = err.message || 'Erro ao salvar'
  } finally {
    submitLoading.value = false
  }
}

function confirmDelete(p) {
  deleteConfirmProduct.value = p
}

async function doDelete() {
  if (!deleteConfirmProduct.value) return
  const p = deleteConfirmProduct.value
  deleteLoadingId.value = p.id
  clearMessages()
  try {
    await deleteProduct(p.id)
    setSuccess('Produto removido.')
    deleteConfirmProduct.value = null
    await fetchProducts()
  } catch (err) {
    errorMessage.value = err.message || 'Erro ao deletar'
  } finally {
    deleteLoadingId.value = null
  }
}

onMounted(() => {
  loadCategories()
  fetchProducts()
  document.addEventListener('click', () => {
    actionMenuId.value = null
  })
})
</script>