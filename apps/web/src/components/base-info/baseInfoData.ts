import { ref } from 'vue'
import type { BaseInfoState } from './types'

const initialState: BaseInfoState = {
  user: {
    name: 'Alice Zhang',
    greeting: 'Hi, Alice Zhang',
    id: 'ID:345879-0209',
    level: 'Lv.5 · GIGA Pro',
  },
  gigaIndex: {
    id: 'giga-index',
    label: 'GIGA Index',
    value: '95.6',
    secondary: 'PR: 90',
    description: '近 30 天成交额 +12%，位于品类 Top 3% 区间。',
  },
  beans: {
    id: 'beans',
    label: 'Beans',
    value: '1550',
    unit: '个',
    description: '每成交 100 USD 返 2 Beans，返利可抵扣下一单。',
  },
  manager: {
    name: '刘婷',
    title: '招商经理 · 北美',
    avatar: 'https://placehold.co/96x96/png',
    qr: 'https://placehold.co/120x120/png',
    phone: '180-4567-8910',
    email: 'liuting@gigacloudtech.com',
  },
}

export const baseInfoState = ref(initialState)
