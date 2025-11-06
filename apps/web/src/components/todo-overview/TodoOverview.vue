<script setup lang="ts">
import TodoCardGrid from "./TodoCardGrid.vue"
import DueSoonPanel from "./DueSoonPanel.vue"
import { todoOverviewState } from "./todoOverviewData"

const state = todoOverviewState.value
</script>

<template>
  <section class="todo-overview-shell mt-[40px]" data-testid="todo-overview">
    <div class="todo-overview-grid">
      <header class="todo-overview-heading todo-yahei">
        <p class="todo-heading m-0">待办总览</p>
        <p class="todo-subheading m-0">以下为近期待处理事项，请尽快处理避免造成损失</p>
      </header>
      <div class="flex-1 overflow-hidden">
        <TodoCardGrid :cards="state.cards" class="todo-card-grid" />
      </div>
    </div>
    <div class="todo-overview-right">
      <DueSoonPanel :module="state.dueSoon" class="h-full" />
    </div>
  </section>
</template>
