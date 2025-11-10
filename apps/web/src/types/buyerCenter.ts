import type { InventoryAgeStyleValue, IsReadValue, IsReplyValue, MakeSureStatusValue } from './enum'

export interface ServiceStructure<T> {
  code: number
  data: {
    common: {
      linkUrl: string | null
      message?: string
    }
    data: T
  }
  message: string
}

export interface IPlatformHelpDesk {
  is_reply: IsReplyValue
  is_read: IsReadValue
  title: string
  msg_type?: string
  msg_type_show: string
  count_down_seconds: number
  create_time: string
  jump_url: string
  msg_id: string
}

export interface IPlatformSystemNotice {
  is_read: IsReadValue
  notice_id: string
  type_id_name: string
  type_id: string
  title: string
  jump_url: string
  make_sure_status: MakeSureStatusValue
  publish_date: string
}

export interface IInventoryAgeHorizontalDetails {
  agreement_qty: number
  available_qty: number
  buyer_lock_qty: number
}

export interface IInventoryAgeHorizontal {
  day_desc: string
  qty: number
  proportion: string
  style: InventoryAgeStyleValue
  details: IInventoryAgeHorizontalDetails
}

export interface IInventoryAgeVertical {
  day_desc: string
  storage_fee_desc: string
}

export interface IInventoryAge {
  horizontal: IInventoryAgeHorizontal[]
  vertical: IInventoryAgeVertical[]
  max_qty: number
  total_qty: number
  horizontal_segments: number
}

export interface IInventoryOverviewMetric {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down' | 'flat'
  accent?: 'primary' | 'secondary'
}

export interface IFundSummaryCard {
  title: string
  amount: string
  description?: string
  group?: 'available' | 'due'
  statusTag?: string
  statusVariant?: 'neutral' | 'danger' | 'success'
}

export interface ICarouselItem {
  id: string
  title: string
  description?: string
  buttonText?: string
  imageUrl?: string
  state?: 'default' | 'expired'
  rewardText?: string
  rewardDelta?: string
}

export interface BuyerDashboardPayload {
  helpDesk: ServiceStructure<IPlatformHelpDesk[]>
  notices: ServiceStructure<IPlatformSystemNotice[]>
  inventoryOverview: ServiceStructure<IInventoryOverviewMetric[]>
  inventoryAge: ServiceStructure<IInventoryAge>
  funds: ServiceStructure<IFundSummaryCard[]>
  rebatePlaza: ServiceStructure<ICarouselItem[]>
  taskBeans: ServiceStructure<ICarouselItem[]>
  banner: ServiceStructure<ICarouselItem[]>
}
