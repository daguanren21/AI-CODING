<script setup lang="ts">
import BaseInfoMetricCard from './BaseInfoMetricCard.vue'
import BaseInfoManagerCard from './BaseInfoManagerCard.vue'
import { baseInfoState } from './baseInfoData'

const state = baseInfoState.value
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
        <BaseInfoMetricCard :card="state.gigaIndex" />
        <span class="info-divider" aria-hidden="true" />
        <BaseInfoMetricCard :card="state.beans" />
        <span class="info-divider" aria-hidden="true" />
        <BaseInfoManagerCard :manager="state.manager" />
      </div>
    </div>
  </section>
</template>
