<script setup lang="ts">
import TodoCard from "./TodoCard.vue"
import type { ITodoCard } from "./types"

const props = defineProps<{ cards: ITodoCard[] }>()
</script>

<template>
  <div class="todo-card-grid min-w-[960px]">
    <TodoCard v-for="card in cards" :key="card.title" :card="card" />
  </div>
</template>

