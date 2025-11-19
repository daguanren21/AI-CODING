import { httpClient } from './client'
import type { BaseInfoState, CustomIndexDetail } from '../components/base-info/types'
import { mockCustomIndexDetail } from '../components/base-info/baseInfoData'

export const fetchBaseInfo = async () => {
  const { data } = await httpClient.get<BaseInfoState>('/base-info')
  return data
}

export const fetchCustomIndexDetail = async () => {
  try {
    const { data } = await httpClient.get<CustomIndexDetail>('/base-info/custom-index')
    return data
  } catch (err) {
    // fallback to mock when API not ready
    return mockCustomIndexDetail
  }
}
