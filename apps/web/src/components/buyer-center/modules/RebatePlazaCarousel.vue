<template>
  <BuyerCard title="店铺返点合约广场" :link-url="linkUrl ?? undefined">
    <BuyerCarousel :items="items" :autoplay-delay="4500">
      <template #default="{ item }">
        <article class="rebate-slide">
          <div class="rebate-slide__avatar">
            <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" />
            <span v-else>{{ item.title?.charAt(0) }}</span>
          </div>
          <div class="rebate-slide__body">
            <div>
              <p class="rebate-slide__title">{{ item.title }}</p>
              <p v-if="item.description" class="rebate-slide__desc">{{ item.description }}</p>
            </div>
            <ElButton type="primary" size="small" round>{{ item.buttonText ?? '立即查看' }}</ElButton>
          </div>
        </article>
      </template>
      <template #empty>
        <BuyerCardEmpty text="暂无返利活动" />
      </template>
    </BuyerCarousel>
  </BuyerCard>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'

import BuyerCard from '../BuyerCard.vue'
import BuyerCardEmpty from '../BuyerCardEmpty.vue'
import BuyerCarousel from './BuyerCarousel.vue'
import type { ICarouselItem } from '@/types/buyerCenter'

withDefaults(
  defineProps<{
    items: ICarouselItem[]
    linkUrl?: string | null
  }>(),
  {
    items: () => [],
    linkUrl: null,
  },
)
</script>

<style scoped>
.rebate-slide {
  display: flex;
  gap: 16px;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 246, 233, 1) 0%, rgba(255, 255, 255, 0) 100%);
  border-radius: 20px;
  padding: 16px;
  border: 1px solid rgba(255, 139, 56, 0.2);
}

.rebate-slide__avatar {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 139, 56, 0.12);
  color: var(--buyer-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  overflow: hidden;
}

.rebate-slide__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rebate-slide__body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.rebate-slide__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--buyer-primary-text);
}

.rebate-slide__desc {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--buyer-muted-text);
}
</style>
