<template>
  <BuyerCard title="资金" :link-url="linkUrl ?? undefined">
    <section class="funds-section">
      <header class="funds-section__header">
        <p class="funds-section__title">可用资金</p>
        <button class="funds-chip" type="button">余额充值</button>
      </header>
      <div class="funds-rows">
        <article v-for="(card, index) in availableFunds" :key="card.title + index" class="funds-row">
          <div class="funds-row__icon" aria-hidden="true"><i class="i-ep-wallet" /></div>
          <p class="funds-row__label">{{ card.description ?? card.title }}</p>
          <p class="funds-row__amount">{{ formatAmount(card.amount) }}</p>
        </article>
      </div>
    </section>

    <section class="funds-section funds-section--due">
      <header class="funds-section__header">
        <div class="funds-section__title-wrap">
          <p class="funds-section__title">应还款</p>
          <span v-if="dueStatusLabel" class="funds-chip funds-chip--danger">{{ dueStatusLabel }}</span>
        </div>
        <button class="funds-chip funds-chip--outline" type="button">全部还清</button>
      </header>
      <div class="funds-rows">
        <article v-for="(card, index) in dueFunds" :key="card.title + index" class="funds-row">
          <div class="funds-row__icon funds-row__icon--due" aria-hidden="true"><i class="i-ep-tickets" /></div>
          <div class="funds-row__body">
            <p class="funds-row__label">{{ card.title }}</p>
            <p v-if="card.description" class="funds-row__desc">{{ card.description }}</p>
          </div>
          <p class="funds-row__amount">{{ formatAmount(card.amount) }}</p>
        </article>
      </div>
    </section>
  </BuyerCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import BuyerCard from '../BuyerCard.vue'
import type { IFundSummaryCard } from '../../../types/buyerCenter'

const props = withDefaults(
  defineProps<{
    cards: IFundSummaryCard[]
    linkUrl?: string | null
  }>(),
  {
    cards: () => [],
    linkUrl: null,
  },
)

const availableFunds = computed(() => props.cards.filter((card) => card.group !== 'due'))
const dueFunds = computed(() => props.cards.filter((card) => card.group === 'due'))
const dueStatusLabel = computed(() => dueFunds.value.find((card) => card.statusTag)?.statusTag ?? null)

const formatter = new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 0 })
const formatAmount = (amount?: string | number | null) => {
  if (amount == null) return '--'
  const numeric = typeof amount === 'number' ? amount : Number(String(amount).replace(/[^\d.-]/g, ''))
  if (Number.isNaN(numeric)) return amount as string
  return formatter.format(numeric)
}
</script>

<style scoped>
.funds-section + .funds-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed var(--buyer-divider);
}

.funds-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.funds-section__title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.funds-section__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--buyer-primary-text);
}

.funds-chip {
  border: none;
  background: var(--buyer-tag-warning-bg);
  color: var(--buyer-tag-warning-text);
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 12px;
  cursor: pointer;
}

.funds-chip--outline {
  background: transparent;
  border: 1px solid var(--buyer-divider);
  color: var(--buyer-secondary-text);
}

.funds-chip--danger {
  background: rgba(255, 141, 141, 0.16);
  color: var(--buyer-tag-danger-text);
}

.funds-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.funds-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
}

.funds-row__icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(117, 160, 244, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--buyer-chart-default);
}

.funds-row__icon--due {
  background: rgba(255, 139, 56, 0.12);
  color: var(--buyer-tag-warning-text);
}

.funds-row__body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.funds-row__label {
  margin: 0;
  font-size: 14px;
  color: var(--buyer-primary-text);
}

.funds-row__desc {
  margin: 0;
  font-size: 12px;
  color: var(--buyer-secondary-text);
}

.funds-row__amount {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--buyer-primary-text);
  white-space: nowrap;
}
</style>
