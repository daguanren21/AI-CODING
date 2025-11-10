<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BaseInfoMetricCard from './BaseInfoMetricCard.vue'
import BaseInfoManagerCard from './BaseInfoManagerCard.vue'
import { useBaseInfoStore } from '../../stores/baseInfoStore'

const baseInfoStore = useBaseInfoStore()

onMounted(() => {
  if (!baseInfoStore.hasLoaded) {
    baseInfoStore.loadBaseInfo()
  }
})

const state = computed(() => baseInfoStore.baseInfo)
</script>

<template>
  <section class="base-info-surface w-full" data-testid="base-info-section">
    <div class="summary-grid flex-col">
      <div class="flex items-center gap-[12px]">
        <p class="m-0 text-[24px] font-semibold text-[var(--base-info-text)]">
          {{ state.user.greeting }}
        </p>
        <span class="level-pill">{{ state.user.level }}</span>
      </div>
      <div class="summary-right">
        <div class="id-chip" data-testid="base-info-id">
          <span class="id-badge">ID</span>
          <span class="text-[var(--base-info-text)]">{{ state.user.id }}</span>
        </div>
        <span class="info-divider" aria-hidden="true" />
        <BaseInfoMetricCard :card="state.customIndex" />
        <span class="info-divider" aria-hidden="true" />
        <BaseInfoMetricCard :card="state.beans" />
        <span class="info-divider" aria-hidden="true" />
        <BaseInfoManagerCard :manager="state.manager" />
      </div>
    </div>
    <p v-if="baseInfoStore.error" class="mt-[8px] text-[14px] text-red-500">
      {{ baseInfoStore.error }}
    </p>
  </section>
</template>
