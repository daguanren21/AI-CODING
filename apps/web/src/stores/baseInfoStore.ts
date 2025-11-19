import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { BaseInfoState, CustomIndexDetail } from '../components/base-info/types'
import { fetchBaseInfo, fetchCustomIndexDetail } from '../api/baseInfo'
import { mockBaseInfoState, mockCustomIndexDetail } from '../components/base-info/baseInfoData'

export const useBaseInfoStore = defineStore('base-info', () => {
  const baseInfo = ref<BaseInfoState>(mockBaseInfoState)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

  const isCustomIndexDialogOpen = ref(false)
  const customIndexDetail = ref<CustomIndexDetail | null>(null)
  const detailLoading = ref(false)
  const detailError = ref<string | null>(null)

  const loadBaseInfo = async () => {
    if (loading.value) return
    loading.value = true
    error.value = null
    try {
      const data = await fetchBaseInfo()
      baseInfo.value = data
      hasLoaded.value = true
    } catch (err) {
      /* c8 ignore next */
      console.error(err)
      error.value = '加载基础信息失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  const loadCustomIndexDetail = async () => {
    if (detailLoading.value) return
    detailLoading.value = true
    detailError.value = null
    try {
      const data = await fetchCustomIndexDetail()
      customIndexDetail.value = data
    } catch (err) {
      /* c8 ignore next */
      console.error(err)
      detailError.value = '加载 Custom Index 详情失败'
      if (!customIndexDetail.value) {
        customIndexDetail.value = mockCustomIndexDetail
      }
    } finally {
      detailLoading.value = false
    }
  }

  const openCustomIndexDialog = () => {
    isCustomIndexDialogOpen.value = true
    void loadCustomIndexDetail()
  }

  const closeCustomIndexDialog = () => {
    isCustomIndexDialogOpen.value = false
  }

  const customIndexScore = computed(() => customIndexDetail.value?.total ?? null)
  const customIndexDimensions = computed(() => customIndexDetail.value?.dimensions ?? [])
  const customIndexPenalties = computed(() => customIndexDetail.value?.penalties ?? [])
  const customIndexSuggestions = computed(() => customIndexDetail.value?.suggestions ?? [])

  return {
    baseInfo,
    loading,
    error,
    hasLoaded,
    loadBaseInfo,
    isCustomIndexDialogOpen,
    customIndexDetail,
    detailLoading,
    detailError,
    loadCustomIndexDetail,
    openCustomIndexDialog,
    closeCustomIndexDialog,
    customIndexScore,
    customIndexDimensions,
    customIndexPenalties,
    customIndexSuggestions,
  }
})
