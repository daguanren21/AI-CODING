import { httpClient } from './client'
import type { BaseInfoState } from '../components/base-info/types'

export const fetchBaseInfo = async () => {
  const { data } = await httpClient.get<BaseInfoState>('/base-info')
  return data
}

