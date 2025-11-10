<template>
  <BuyerCard title="" hide-header>
    <BuyerCarousel :items="items" :autoplay-delay="5000" :loop="false">
      <template #default="{ item }">
        <article class="banner-slide">
          <img v-if="item.imageUrl" :src="item.imageUrl" alt="" />
          <div v-else class="banner-slide__placeholder">暂无 Banner</div>
        </article>
      </template>
      <template #empty>
        <BuyerCardEmpty text="暂无 Banner" />
      </template>
    </BuyerCarousel>
  </BuyerCard>
</template>

<script setup lang="ts">
import BuyerCarousel from './BuyerCarousel.vue'
import BuyerCard from '../BuyerCard.vue'
import BuyerCardEmpty from '../BuyerCardEmpty.vue'
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
.banner-slide {
  width: 100%;
  height: 180px;
  border-radius: 20px;
  overflow: hidden;
}

.banner-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-slide__placeholder {
  width: 100%;
  height: 100%;
  background: #f2f3f5;
  color: var(--buyer-muted-text);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
