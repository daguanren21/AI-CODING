<template>
  <div class="buyer-carousel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <Swiper
      v-if="items.length"
      :modules="swiperModules"
      :slides-per-view="1"
      :loop="loop && hasMultiple"
      :autoplay="autoplayOptions"
      class="buyer-carousel__swiper"
      @swiper="setSwiper"
      @slide-change="handleSlideChange"
    >
      <SwiperSlide v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index" />
      </SwiperSlide>
    </Swiper>
    <slot v-else name="empty" />

    <div v-if="hasMultiple" class="buyer-carousel__indicators" role="tablist">
      <button
        v-for="(_, index) in items"
        :key="index"
        class="carousel-indicator"
        :class="{ 'carousel-indicator--active': index === activeIndex }"
        type="button"
        :aria-label="`跳转到第 ${index + 1} 张`"
        :aria-pressed="index === activeIndex"
        @click="handleIndicatorClick(index)"
        @keydown.enter.prevent="handleIndicatorClick(index)"
        @keydown.space.prevent="handleIndicatorClick(index)"
      >
        <span class="sr-only">第 {{ index + 1 }} 张</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper/types'
import 'swiper/css'
import type { ICarouselItem } from '@/types/buyerCenter'

const props = withDefaults(
  defineProps<{
    items: ICarouselItem[]
    autoplayDelay?: number | null
    loop?: boolean
  }>(),
  {
    items: () => [],
    autoplayDelay: 4000,
    loop: true,
  },
)

defineSlots<{
  default(props: { item: ICarouselItem; index: number }): unknown
  empty?(): unknown
}>()

const swiperRef = ref<SwiperInstance | null>(null)
const activeIndex = ref(0)

const hasMultiple = computed(() => props.items.length > 1)

const swiperModules = computed(() => (props.autoplayDelay ? [Autoplay] : []))
const autoplayOptions = computed(() =>
  props.autoplayDelay
    ? { delay: props.autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true }
    : false,
)

const setSwiper = (instance: SwiperInstance) => {
  swiperRef.value = instance
  activeIndex.value = instance.activeIndex ?? 0
  instance.autoplay?.start()
}

const handleSlideChange = (instance: SwiperInstance) => {
  activeIndex.value = instance.realIndex ?? instance.activeIndex ?? 0
}

const handleIndicatorClick = (index: number) => {
  swiperRef.value?.slideToLoop(index)
}

const handleMouseEnter = () => {
  if (!props.autoplayDelay) return
  swiperRef.value?.autoplay?.stop()
}

const handleMouseLeave = () => {
  if (!props.autoplayDelay) return
  swiperRef.value?.autoplay?.start()
}

watch(
  () => props.items,
  () => {
    swiperRef.value?.update()
    swiperRef.value?.slideTo(0, 0)
    activeIndex.value = 0
  },
  { deep: true },
)
</script>

<style scoped>
.buyer-carousel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.buyer-carousel__swiper {
  width: 100%;
}

.buyer-carousel__indicators {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.carousel-indicator {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  background: var(--buyer-indicator-inactive);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.carousel-indicator--active {
  width: 18px;
  background: var(--buyer-indicator-active);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
