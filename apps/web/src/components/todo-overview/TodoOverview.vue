<script setup lang="ts">
import { computed, onMounted } from 'vue'

import TodoCardGrid from './TodoCardGrid.vue'
import DueSoonPanel from './DueSoonPanel.vue'
import BuyerDashboardShell from '../buyer-center/BuyerDashboardShell.vue'
import { useTodoOverviewStore } from '../../stores/todoOverviewStore'

const todoOverviewStore = useTodoOverviewStore()

onMounted(() => {
  if (!todoOverviewStore.hasLoaded) {
    todoOverviewStore.loadTodoOverview()
  }
})

const cards = computed(() => todoOverviewStore.cards)
const dueSoonModule = computed(() => todoOverviewStore.dueSoon)
</script>

<template>
  <section class="todo-overview-shell mt-[40px]" data-testid="todo-overview">
    <div class="todo-overview-grid">
      <header class="todo-overview-heading todo-yahei">
        <p class="todo-heading m-0">待办总览</p>
        <p class="todo-subheading m-0">以下为近期待处理事项，请尽快处理避免造成损失</p>
      </header>
      <div class="flex-1 overflow-hidden">
        <TodoCardGrid :cards="cards" class="todo-card-grid" />
      </div>
    </div>
    <div class="todo-overview-right">
      <DueSoonPanel :module="dueSoonModule" class="h-full" />
    </div>
    <p v-if="todoOverviewStore.error" class="mt-[12px] text-[14px] text-red-500">
      {{ todoOverviewStore.error }}
    </p>
  </section>
  <BuyerDashboardShell />
</template>

<style scoped>
.todo-overview-shell {
  background: linear-gradient(180deg, #E6EDFF -9.01%, #FFFFFF 100%);
  box-sizing: border-box;
}
</style>
