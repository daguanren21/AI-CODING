<template>
  <section class="buyer-dashboard" data-testid="buyer-dashboard">
    <div v-if="error" class="buyer-dashboard__error">{{ error }}</div>
    <div v-else class="buyer-dashboard__content">
      <div class="buyer-dashboard__column">
        <HelpDeskPanel
          :items="helpDeskItems"
          :link-url="commonLink('helpDesk')"
          :message="helpDeskMessage"
          @height-change="store.setHelpDeskHeight"
        />
        <NoticePanel :items="noticeItems" :link-url="commonLink('notices')" :message="noticeMessage" />
      </div>
      <div class="buyer-dashboard__column">
        <InventoryOverviewPanel :metrics="inventoryOverview" :link-url="commonLink('inventoryOverview')" />
        <InventoryAgePanel :data="inventoryAge" :ticks="inventoryAgeXAxis" :link-url="commonLink('inventoryAge')" />
        <BannerCarousel :items="bannerSlides" :link-url="commonLink('banner')" />
      </div>
      <div class="buyer-dashboard__column">
        <FundsPanel :cards="fundsCards" :link-url="commonLink('funds')" />
        <RebatePlazaCarousel :items="rebateSlides" :link-url="commonLink('rebatePlaza')" />
        <TaskBeansCarousel :items="taskSlides" :link-url="commonLink('taskBeans')" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import HelpDeskPanel from './modules/HelpDeskPanel.vue'
import NoticePanel from './modules/NoticePanel.vue'
import InventoryOverviewPanel from './modules/InventoryOverviewPanel.vue'
import InventoryAgePanel from './modules/InventoryAgePanel.vue'
import BannerCarousel from './modules/BannerCarousel.vue'
import FundsPanel from './modules/FundsPanel.vue'
import RebatePlazaCarousel from './modules/RebatePlazaCarousel.vue'
import TaskBeansCarousel from './modules/TaskBeansCarousel.vue'
import { useBuyerCenterStore } from '../../stores/buyerCenterStore'
import type { BuyerDashboardPayload, ServiceStructure } from '../../types/buyerCenter'

const store = useBuyerCenterStore()

onMounted(() => {
  if (!store.hasLoaded) {
    store.fetchDashboard()
  }
})

const helpDeskItems = computed(() => store.helpDeskItems)
const noticeItems = computed(() => store.noticeItems)
const inventoryOverview = computed(() => store.inventoryOverview)
const inventoryAge = computed(() => store.inventoryAge)
const inventoryAgeXAxis = computed(() => store.inventoryAgeXAxis)
const bannerSlides = computed(() => store.bannerSlides)
const fundsCards = computed(() => store.fundsCards)
const rebateSlides = computed(() => store.rebateSlides)
const taskSlides = computed(() => store.taskSlides)
const error = computed(() => store.error)
const helpDeskMessage = computed(() => store.helpDeskMessage)
const noticeMessage = computed(() => store.noticeMessage)

const commonLink = (key: keyof BuyerDashboardPayload): string | null => {
  if (!store.payload) return null
  const section = store.payload[key] as ServiceStructure<unknown> | undefined
  return section?.data?.common?.linkUrl ?? null
}
</script>

<style scoped>
@import './styles/base.css';

.buyer-dashboard {
  padding: 32px 0;
}

.buyer-dashboard__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 772px) minmax(0, 1fr);
  column-gap: 24px;
  row-gap: 20px;
  min-height: 880px;
}

.buyer-dashboard__column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.buyer-dashboard__error {
  color: var(--buyer-tag-danger-text);
}
</style>
