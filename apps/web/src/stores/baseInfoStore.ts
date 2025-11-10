import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BaseInfoState } from '../components/base-info/types'
import { fetchBaseInfo } from '../api/baseInfo'
import { mockBaseInfoState } from '../components/base-info/baseInfoData'

export const useBaseInfoStore = defineStore('base-info', () => {
  const baseInfo = ref<BaseInfoState>(mockBaseInfoState)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

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
      error.value = '????????'
    } finally {
      loading.value = false
    }
  }

  return {
    baseInfo,
    loading,
    error,
    hasLoaded,
    loadBaseInfo,
  }
})
