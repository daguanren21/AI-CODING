<template>
  <BuyerCard title="做任务，领云仓豆!" :link-url="linkUrl ?? undefined">
    <BuyerCarousel :items="items" :autoplay-delay="null" :loop="false">
      <template #default="{ item }">
        <div class="task-list">
          <article
            :key="item.id ?? item.title"
            class="task-row"
            :data-state="item.state"
          >
            <div class="task-row__icon">
              <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" />
              <i v-else class="i-ep-medal" aria-hidden="true"></i>
            </div>
            <div class="task-row__body">
              <p class="task-row__title">{{ item.title }}</p>
              <p v-if="item.description" class="task-row__desc">{{ item.description }}</p>
              <p v-if="item.rewardDelta" class="task-row__reward">
                {{ item.rewardText ?? '奖励' }} <strong>{{ item.rewardDelta }}</strong>
              </p>
            </div>
            <ElButton
              class="task-row__action"
              size="small"
              :type="item.state === 'expired' ? 'info' : 'success'"
              plain
              round
            >
              {{ item.buttonText ?? (item.state === 'expired' ? '已过期' : '领取奖励') }}
            </ElButton>
          </article>
        </div>
      </template>
      <template #empty>
        <BuyerCardEmpty text="暂无任务" />
      </template>
    </BuyerCarousel>
  </BuyerCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElButton } from 'element-plus'

import BuyerCard from '../BuyerCard.vue'
import BuyerCardEmpty from '../BuyerCardEmpty.vue'
import BuyerCarousel from './BuyerCarousel.vue'
import type { ICarouselItem } from '@/types/buyerCenter'

const props = withDefaults(
  defineProps<{
    items: ICarouselItem[]
    linkUrl?: string | null
  }>(),
  {
    items: () => [],
    linkUrl: null,
  },
)

const items = computed(() => props.items)
</script>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-row {
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: flex-start;
}

.task-row + .task-row {
  border-top: 1px solid var(--buyer-divider);
  padding-top: 12px;
}

.task-row__icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(117, 160, 244, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--buyer-chart-default);
  overflow: hidden;
  flex: none;
}

.task-row__icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.task-row__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task-row__title {
  margin: 0;
  font-size: 14px;
  color: var(--buyer-primary-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-row__desc {
  margin: 0;
  font-size: 12px;
  color: var(--buyer-secondary-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-row__reward {
  margin: 0;
  font-size: 12px;
  color: var(--buyer-accent);
}

.task-row__action {
  flex: none;
  white-space: nowrap;
}

.task-row[data-state='expired'] {
  opacity: 0.6;
}
</style>
