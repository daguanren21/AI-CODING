<template>
  <BuyerCard title="库存概览" :link-url="linkUrl ?? undefined">
    <div class="overview-grid">
      <article
        v-for="(group, index) in groupedMetrics"
        :key="index"
        class="overview-block"
        :data-variant="index === 0 ? 'full' : 'agreement'"
      >
        <header class="overview-block__header">
          <p class="overview-block__title">{{ sectionLabels[index] }}</p>
          <ElIcon class="overview-block__icon"><ArrowRight /></ElIcon>
        </header>
        <div class="overview-block__content">
          <div v-for="metric in group" :key="metric.label" class="overview-metric">
            <p class="overview-metric__label">{{ metric.label }}</p>
            <p class="overview-metric__value">{{ metric.value }}</p>
            <p v-if="metric.delta" class="overview-metric__delta" :data-trend="metric.trend">{{ metric.delta }}</p>
          </div>
        </div>
      </article>
    </div>
  </BuyerCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElIcon } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'

import BuyerCard from '../BuyerCard.vue'
import type { IInventoryOverviewMetric } from '../../../types/buyerCenter'

const props = withDefaults(
  defineProps<{
    metrics: IInventoryOverviewMetric[]
    linkUrl?: string | null
  }>(),
  {
    metrics: () => [],
    linkUrl: null,
  },
)

const sectionLabels = ['全款库存', '协议库存']

const groupedMetrics = computed(() => {
  const chunkSize = 2
  const groups: IInventoryOverviewMetric[][] = []
  for (let i = 0; i < props.metrics.length; i += chunkSize) {
    groups.push(props.metrics.slice(i, i + chunkSize))
  }
  return groups
})
</script>

<style scoped>
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.overview-block {
  border-radius: 20px;
  padding: 18px;
  background: linear-gradient(180deg, rgba(242, 245, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  border: 1px solid rgba(117, 160, 244, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.overview-block[data-variant='full'] {
  background: linear-gradient(180deg, rgba(232, 245, 241, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  border-color: rgba(10, 173, 79, 0.18);
}

.overview-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.overview-block__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--buyer-primary-text);
}

.overview-block__icon {
  color: var(--buyer-muted-text);
  font-size: 16px;
}

.overview-block__content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.overview-metric__label {
  margin: 0;
  font-size: 13px;
  color: var(--buyer-secondary-text);
}

.overview-metric__value {
  margin: 4px 0 0;
  font-size: 26px;
  font-weight: 600;
  color: var(--buyer-primary-text);
}

.overview-metric__delta {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--buyer-muted-text);
}

.overview-metric__delta[data-trend='up'] {
  color: #0aad4f;
}

.overview-metric__delta[data-trend='down'] {
  color: var(--buyer-tag-danger-text);
}
</style>
