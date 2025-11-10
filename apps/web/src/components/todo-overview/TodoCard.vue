<script setup lang="ts">
import { toRef } from 'vue'
import type { ITodoCard } from './types'

const props = defineProps<{ card: ITodoCard }>()
const card = toRef(props, 'card')
</script>

<template>
  <div class="group todo-card todo-card-hover" data-testid="todo-card" tabindex="0">
    <span class="todo-card-overlay todo-card-overlay--hover" aria-hidden="true" />
    <div class="todo-icon-box relative z-[1]">
      <img :src="card.icon" :alt="card.title" class="h-full w-full object-contain" loading="lazy" />
    </div>
    <div class="relative z-[1] flex flex-1 flex-col gap-[8px]">
      <p class="todo-card-title">
        {{ card.title }}
      </p>
      <span class="todo-card-number">{{ card.num }}</span>
    </div>
  </div>
</template>
