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

export interface BaseInfoState {
  user: UserProfile
  customIndex: MetricCardData
  beans: MetricCardData
  manager: ManagerInfo
}
