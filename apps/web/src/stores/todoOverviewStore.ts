import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ITodoCard, IToDoListModule } from '../components/todo-overview/types'
import { fetchTodoOverview } from '../api/todoOverview'
import { mockDueSoonModule, mockTodoCards } from '../components/todo-overview/todoOverviewData'

export const useTodoOverviewStore = defineStore('todo-overview', () => {
  const cards = ref<ITodoCard[]>(mockTodoCards)
  const dueSoon = ref<IToDoListModule>(mockDueSoonModule)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

  const loadTodoOverview = async () => {
    if (loading.value) return
    loading.value = true
    error.value = null
    try {
      const data = await fetchTodoOverview()
      cards.value = data.cards
      dueSoon.value = data.dueSoon
      hasLoaded.value = true
    } catch (err) {
      /* c8 ignore next */
      console.error(err)
      error.value = '加载待办数据失败'
    } finally {
      loading.value = false
    }
  }

  return {
    cards,
    dueSoon,
    loading,
    error,
    hasLoaded,
    loadTodoOverview,
  }
})
