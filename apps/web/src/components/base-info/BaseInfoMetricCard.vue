<script setup lang="ts">
import { computed } from 'vue'
import type { MetricCardData } from './types'

const props = defineProps<{ card: MetricCardData }>()

const showUnit = computed(() => Boolean(props.card.unit))
</script>

<template>
  <button
    type="button"
    class="metric-link"
    :data-testid="`metric-card-${props.card.id}`"
    :aria-label="`${props.card.label} ${props.card.value}${props.card.unit ? ` ${props.card.unit}` : ''}`"
  >
    <span class="text-[var(--base-info-text)] text-[14px] mr-[4px]">{{ card.label }}:</span>
    <span class="metric-content">
      <span class="text-[16px] font-semibold">{{ card.value }}</span>
      <span v-if="showUnit" class="metric-unit">{{ card.unit }}</span>
      <span v-if="card.secondary" class="text-[14px] text-[var(--metric-accent)]">/ {{ card.secondary }}</span>
    </span>
  </button>
</template>
