export interface MetricCardData {
  id: string
  label: string
  value: string
  unit?: string
  description?: string
  secondary?: string
}

export interface UserProfile {
  name: string
  greeting: string
  id: string
  level: string
}

export interface ManagerInfo {
  name: string
  title: string
  avatar: string
  email: string
  phone: string
  qr: string
}

export interface CustomIndexDimension {
  id: string
  label: string
  weight: number
  score: number
  trend?: 'up' | 'down' | 'flat'
  suggestionCount?: number
  badge?: 'good' | 'warning'
  action?: 'suggestion' | 'detail'
}

export interface CustomIndexPenalty {
  id: string
  label: string
  value: number
  actionLabel: string
  linkUrl?: string
}

export interface CustomIndexSuggestion {
  id: string
  title: string
  description: string
  tips: string
  linkText: string
  linkUrl: string
}

export interface CustomIndexDetail {
  total: number
  max: number
  lastUpdated: string
  frequencyNote: string
  dimensions: CustomIndexDimension[]
  penalties: CustomIndexPenalty[]
  suggestions: CustomIndexSuggestion[]
}

export interface BaseInfoState {
  user: UserProfile
  customIndex: MetricCardData
  beans: MetricCardData
  manager: ManagerInfo
  customIndexDetail?: CustomIndexDetail
}
