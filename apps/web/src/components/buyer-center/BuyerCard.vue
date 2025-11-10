<template>
  <section class="buyer-card" data-testid="buyer-card">
    <header v-if="!hideHeader" class="buyer-card__header">
      <div class="buyer-card__title">
        <span class="buyer-card__title-text">{{ title }}</span>
        <ElTooltip v-if="tip" :content="tip" placement="top">
          <i class="i-ep-warning buyer-card__tip" aria-label="提示"></i>
        </ElTooltip>
      </div>
      <div v-if="message || linkUrl" class="buyer-card__meta">
        <span v-if="message" class="buyer-card__message">{{ message }}</span>
        <ElLink v-if="linkUrl" :href="linkUrl" target="_blank" underline="hover" class="buyer-card__link">
          <ElIcon><ArrowRight /></ElIcon>
        </ElLink>
      </div>
    </header>
    <div class="buyer-card__body" :class="{ 'buyer-card__body--flush': hideHeader }">
      <slot v-if="hasContent" />
      <BuyerCardEmpty v-else :text="emptyText" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElIcon, ElLink, ElTooltip } from 'element-plus'
import { computed, useSlots } from 'vue'

import BuyerCardEmpty from './BuyerCardEmpty.vue'

withDefaults(
  defineProps<{
    title: string
    tip?: string
    message?: string
    linkUrl?: string | null
    emptyText?: string
    hideHeader?: boolean
  }>(),
  {
    tip: undefined,
    message: undefined,
    emptyText: '暂无内容',
    hideHeader: false,
  },
)

const slots = useSlots()
const hasContent = computed(() => Boolean(slots.default?.().some((node) => node)))
</script>

<style scoped>
.buyer-card {
  background-color: var(--buyer-card-bg);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: var(--buyer-card-shadow);
}

.buyer-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.buyer-card__title {
  display: flex;
  align-items: center;
  gap: 6px;
}

.buyer-card__title-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--buyer-primary-text);
}

.buyer-card__tip {
  font-size: 16px;
  color: var(--buyer-muted-text);
}

.buyer-card__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--buyer-secondary-text);
}

.buyer-card__link {
  color: var(--buyer-accent);
}

.buyer-card__body {
  flex: 1;
  margin-top: 16px;
}

.buyer-card__body--flush {
  margin-top: 0;
}
</style>
