<script setup lang="ts">
import { computed, watch, ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Autoplay } from "swiper/modules"
import type { Swiper as SwiperInstance } from "swiper/types"
import "swiper/css"

import DueSoonItem from "./DueSoonItem.vue"
import { useTodoCarousel } from "./useTodoCarousel"
import type { IToDoListModule } from "./types"

const props = defineProps<{ module: IToDoListModule }>()

const groupSize = computed(() => props.module.groupSize ?? 3)
const rawSlides = useTodoCarousel(() => props.module.items, () => groupSize.value)
const slideGroups = computed(() => rawSlides.value ?? [[]])

const swiperRef = ref<SwiperInstance | null>(null)
const activeIndex = ref(0)

const modules = [Autoplay]

const hasMultipleSlides = computed(() => slideGroups.value.length > 1)
const shouldShowViewAll = computed(() => Boolean(props.module.url && props.module.total > props.module.items.length))

const setSwiper = (instance: SwiperInstance) => {
  swiperRef.value = instance
  activeIndex.value = instance.activeIndex ?? 0
  instance.autoplay?.start()
}

const handleSlideChange = (instance: SwiperInstance) => {
  activeIndex.value = instance.activeIndex ?? 0
}

watch(
  () => [props.module.items, groupSize.value],
  () => {
    swiperRef.value?.update()
    swiperRef.value?.slideTo(0, 0)
    activeIndex.value = 0
  },
  { deep: true },
)

const handleIndicatorClick = (index: number) => {
  swiperRef.value?.slideTo(index)
}

const handleMouseEnter = () => {
  swiperRef.value?.autoplay?.stop()
}

const handleMouseLeave = () => {
  swiperRef.value?.autoplay?.start()
}
</script>

<template>
  <section class="todo-due-panel todo-yahei" data-testid="todo-due-panel" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <header class="todo-due-header">
      <div class="flex items-center gap-[8px]">
        <p class="m-0 text-[16px] font-bold text-[var(--todo-heading)]">{{ module.title }}</p>
        <span class="todo-count-tag">{{ module.total }}</span>
      </div>
      <a
        v-if="shouldShowViewAll"
        :href="module.url"
        target="_blank"
        rel="noreferrer"
        class="todo-view-all"
      >
        查看全部
      </a>
    </header>

    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }"
      :loop="hasMultipleSlides"
      class="todo-due-swiper"
      @swiper="setSwiper"
      @slide-change="handleSlideChange"
    >
      <SwiperSlide class="w-full" v-for="(group, index) in slideGroups" :key="index" :style="{ width: '100%' }">
        <div class="flex flex-col gap-[12px]">
          <DueSoonItem v-for="item in group" :key="item.title" :item="item" />
          <p v-if="!group.length" class="m-0 text-[14px] text-[var(--todo-subheading)]" data-testid="todo-due-empty">暂无到期事项</p>
        </div>
      </SwiperSlide>
    </Swiper>

    <div v-if="hasMultipleSlides" class="mt-[12px] flex items-center justify-center gap-[4px]">
      <div
        v-for="(_, index) in slideGroups"
        :key="index"
        class="todo-indicator"
        :class="{ 'todo-indicator--active': index === activeIndex }"
        :aria-label="`第 ${index + 1} 页`"
        :aria-pressed="index === activeIndex"
        role="button"
        tabindex="0"
        @click="handleIndicatorClick(index)"
        @keydown.enter.prevent="handleIndicatorClick(index)"
        @keydown.space.prevent="handleIndicatorClick(index)"
      >
        <span class="sr-only">第 {{ index + 1 }} 页</span>
      </div>
    </div>
  </section>
</template>





