<script setup lang="ts">
import { computed } from "vue"
import type { IToDoListModuleItem } from "./types"

const props = defineProps<{ item: IToDoListModuleItem }>()

const countdownClass = computed(() =>
  props.item.tag.tone === "critical" ? "todo-countdown--critical" : "todo-countdown--warning",
)
</script>

<template>
  <div class="todo-due-item" data-testid="todo-due-item">
    <div class="flex flex-1 flex-col gap-[4px]">
      <a :href="item.url" class="todo-due-title transition" target="_blank" rel="noreferrer">
        {{ item.title }}
      </a>
      <p v-if="item.meta" class="todo-meta m-0">{{ item.meta }}</p>
    </div>
    <span class="todo-due-countdown" :class="countdownClass">{{ item.countdownDesc }}</span>
  </div>
</template>
