import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type {
  BuyerDashboardPayload,
  ICarouselItem,
  IFundSummaryCard,
  IInventoryAge,
  IInventoryOverviewMetric,
  IPlatformHelpDesk,
  IPlatformSystemNotice,
} from '../types/buyerCenter'
import { fetchBuyerDashboard } from '../api/buyerCenter'

const NOTICE_ITEM_HEIGHT = 52
const NOTICE_MAX_ROWS = 7

export const useBuyerCenterStore = defineStore('buyer-center', () => {
  const payload = ref<BuyerDashboardPayload | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)
  const helpDeskHeight = ref(0)

  const noticeVisibleCount = computed(() => {
    if (!helpDeskHeight.value) return NOTICE_MAX_ROWS
    const rows = Math.floor(helpDeskHeight.value / NOTICE_ITEM_HEIGHT)
    return Math.min(NOTICE_MAX_ROWS, Math.max(rows, 1))
  })

  const setHelpDeskHeight = (height: number) => {
    helpDeskHeight.value = height
  }

  const fetchDashboard = async () => {
    if (loading.value) return
    loading.value = true
    error.value = null
    try {
      const data = await fetchBuyerDashboard()
      payload.value = data
      hasLoaded.value = true
    } catch (err) {
      console.error(err)
      error.value = '?? Buyer Center ????'
    } finally {
      loading.value = false
    }
  }

  const helpDeskItems = computed<IPlatformHelpDesk[]>(() => payload.value?.helpDesk.data.data ?? [])
  const rawNoticeItems = computed<IPlatformSystemNotice[]>(() => payload.value?.notices.data.data ?? [])
  const noticeItems = computed<IPlatformSystemNotice[]>(() => rawNoticeItems.value.slice(0, noticeVisibleCount.value))
  const inventoryOverview = computed<IInventoryOverviewMetric[]>(() => payload.value?.inventoryOverview.data.data ?? [])
  const inventoryAge = computed<IInventoryAge | null>(() => payload.value?.inventoryAge.data.data ?? null)
  const fundsCards = computed<IFundSummaryCard[]>(() => payload.value?.funds.data.data ?? [])
  const bannerSlides = computed<ICarouselItem[]>(() => payload.value?.banner.data.data ?? [])
  const rebateSlides = computed<ICarouselItem[]>(() => payload.value?.rebatePlaza.data.data ?? [])
  const taskSlides = computed<ICarouselItem[]>(() => payload.value?.taskBeans.data.data ?? [])

  const inventoryAgeXAxis = computed(() => {
    if (!inventoryAge.value) return []
    const segments = inventoryAge.value.horizontal_segments || 1
    const max = inventoryAge.value.max_qty || 0
    const step = segments > 0 ? max / segments : max
    const ticks: number[] = []
    for (let i = 0; i <= segments; i += 1) {
      ticks.push(Math.round(step * i))
    }
    return ticks
  })

  const helpDeskMessage = computed(() => payload.value?.helpDesk.data.common.message ?? `${helpDeskItems.value.length}???`)
  const noticeMessage = computed(() => payload.value?.notices.data.common.message ?? `${rawNoticeItems.value.length}???`)
  const newNoticeCount = computed(() => rawNoticeItems.value.filter((item) => item.is_read === 0).length)

  return {
    payload,
    loading,
    error,
    hasLoaded,
    helpDeskHeight,
    noticeVisibleCount,
    helpDeskItems,
    rawNoticeItems,
    noticeItems,
    inventoryOverview,
    inventoryAge,
    fundsCards,
    bannerSlides,
    rebateSlides,
    taskSlides,
    inventoryAgeXAxis,
    helpDeskMessage,
    noticeMessage,
    newNoticeCount,
    setHelpDeskHeight,
    fetchDashboard,
  }
})
