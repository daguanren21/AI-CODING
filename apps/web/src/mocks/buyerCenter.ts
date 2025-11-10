import type {
  BuyerDashboardPayload,
  ICarouselItem,
  IFundSummaryCard,
  IInventoryAge,
  IInventoryOverviewMetric,
  IPlatformHelpDesk,
  IPlatformSystemNotice,
} from '../types/buyerCenter'
import { InventoryAgeStyle, IsRead, IsReply, MakeSureStatus } from '../types/enum'

const helpDeskItems: IPlatformHelpDesk[] = [
  {
    is_reply: IsReply.REPLIED,
    is_read: IsRead.UNREAD,
    title: '关于订单 [567145639] 的问题反馈与处理通知',
    msg_type: 'ad',
    msg_type_show: '广告位征集通知',
    count_down_seconds: 3600 * 24 * 2,
    create_time: '2025-04-30 10:00',
    jump_url: 'https://example.com/ticket/1',
    msg_id: 'msg-001',
  },
  {
    is_reply: IsReply.UNREPLIED,
    is_read: IsRead.UNREAD,
    title: '【费用名费用名问题名称】 即将到期，请及时缴付',
    msg_type: 'notice',
    msg_type_show: '催缴函',
    count_down_seconds: 3600 * 12,
    create_time: '2025-04-30 10:00',
    jump_url: 'https://example.com/ticket/2',
    msg_id: 'msg-002',
  },
  {
    is_reply: IsReply.UNREPLIED,
    is_read: IsRead.READ,
    title: '关于【争议事项赔偿函】提交快递地址通知',
    msg_type: 'notice',
    msg_type_show: '仲裁通知',
    count_down_seconds: 0,
    create_time: '2025-04-30 10:00',
    jump_url: 'https://example.com/ticket/3',
    msg_id: 'msg-003',
  },
]

const noticeItems: IPlatformSystemNotice[] = [
  {
    is_read: IsRead.UNREAD,
    notice_id: 'notice-001',
    type_id_name: 'Seller Account Closure Reminder',
    type_id: 'sys',
    title: '系统维护计划于【2025年7月10日】执行',
    jump_url: 'https://example.com/notice/1',
    make_sure_status: MakeSureStatus.NO,
    publish_date: '2025-04-30 10:00',
  },
  {
    is_read: IsRead.UNREAD,
    notice_id: 'notice-002',
    type_id_name: '平台政策',
    type_id: 'policy',
    title: '平台使用规范已更新',
    jump_url: 'https://example.com/notice/2',
    make_sure_status: MakeSureStatus.NO,
    publish_date: '2025-04-30 10:00',
  },
  {
    is_read: IsRead.READ,
    notice_id: 'notice-003',
    type_id_name: '物流服务',
    type_id: 'logistics',
    title: '节日期间物流发货时间调整通知',
    jump_url: 'https://example.com/notice/3',
    make_sure_status: MakeSureStatus.YES,
    publish_date: '2025-04-30 10:00',
  },
]

const inventoryOverview: IInventoryOverviewMetric[] = [
  { label: '数量', value: '30,000', delta: '+2.5%', trend: 'up', accent: 'primary' },
  { label: '全款金额', value: '$1,998,000.00', accent: 'primary' },
  { label: '数量', value: '40,000', delta: '+1.2%', trend: 'up', accent: 'secondary' },
  { label: '保证金额', value: '$60,999,000.00', accent: 'secondary' },
]

const inventoryAge: IInventoryAge = {
  max_qty: 8000,
  total_qty: 207388,
  horizontal_segments: 5,
  vertical: [
    { day_desc: '1-30天', storage_fee_desc: '0.5CANS/m³·天' },
    { day_desc: '31-60天', storage_fee_desc: '0.8CANS/m³·天' },
    { day_desc: '61-120天', storage_fee_desc: '0.9CANS/m³·天' },
    { day_desc: '121-270天', storage_fee_desc: '1.0CANS/m³·天' },
    { day_desc: '271-390天', storage_fee_desc: '1.01CANS/m³·天' },
    { day_desc: '390天以上', storage_fee_desc: '1.01CANS/m³·天' },
  ],
  horizontal: [
    {
      day_desc: '1-30天',
      qty: 74779,
      proportion: '36%',
      style: InventoryAgeStyle.DEFAULT,
      details: { agreement_qty: 1200, available_qty: 60000, buyer_lock_qty: 8000 },
    },
    {
      day_desc: '31-60天',
      qty: 56635,
      proportion: '27%',
      style: InventoryAgeStyle.DEFAULT,
      details: { agreement_qty: 1000, available_qty: 40000, buyer_lock_qty: 5000 },
    },
    {
      day_desc: '61-120天',
      qty: 43887,
      proportion: '21%',
      style: InventoryAgeStyle.DEFAULT,
      details: { agreement_qty: 900, available_qty: 32000, buyer_lock_qty: 4800 },
    },
    {
      day_desc: '121-270天',
      qty: 19027,
      proportion: '10%',
      style: InventoryAgeStyle.DEFAULT,
      details: { agreement_qty: 600, available_qty: 12000, buyer_lock_qty: 4000 },
    },
    {
      day_desc: '271-390天',
      qty: 4918,
      proportion: '2%',
      style: InventoryAgeStyle.WARNING,
      details: { agreement_qty: 200, available_qty: 4000, buyer_lock_qty: 700 },
    },
    {
      day_desc: '390天以上',
      qty: 8142,
      proportion: '4%',
      style: InventoryAgeStyle.HIGHLIGHT,
      details: { agreement_qty: 500, available_qty: 5000, buyer_lock_qty: 2600 },
    },
  ],
}

const fundsCards: IFundSummaryCard[] = [
  { title: '余额', amount: '$1,000,000.00', description: '余额充值', group: 'available' },
  { title: '授信', amount: '$1,000,000.00', description: '授信额度', group: 'available' },
  { title: 'SAAS', amount: '$1,000,000.00', description: 'SAAS 服务', group: 'available' },
  { title: '欠款单应还', amount: '$100,000.00', group: 'due', statusTag: '逾期:$50.00', statusVariant: 'danger' },
  { title: '授信应还', amount: '$1,000,000.00', group: 'due', statusTag: '全部还清', statusVariant: 'success' },
  { title: 'SAAS 应还', amount: '$1,000,000.00', group: 'due', statusVariant: 'success' },
]

const bannerSlides: ICarouselItem[] = [
  {
    id: 'banner-1',
    title: '云仓黑五大促火热上线',
    description: '提前补货最高返 8%',
    imageUrl: 'https://picsum.photos/seed/buyer-banner-1/560/240',
  },
]

const rebateSlides: ICarouselItem[] = [
  {
    id: 'rebate-1',
    title: 'W808 店铺返点合约',
    description: '返点津贴 $1,000 - $3,000',
    buttonText: '查看',
  },
  {
    id: 'rebate-2',
    title: '跨境 Q4 合约',
    description: '签约后 30 天享封顶返点',
    buttonText: '查看',
  },
]

const taskSlides: ICarouselItem[] = [
  {
    id: 'task-1',
    title: '查看未读消息，不错过重要消息',
    description: '查看 Seller 的未读消息 3 个',
    buttonText: '领取奖励',
    rewardDelta: '+2',
    rewardText: '云仓豆',
  },
  {
    id: 'task-2',
    title: '精准搜索，锁定目标好货',
    description: '有效使用搜索选品 2 次',
    buttonText: '已过期',
    state: 'expired',
    rewardDelta: '+2',
    rewardText: '云仓豆',
  },
]

export const mockBuyerDashboardPayload: BuyerDashboardPayload = {
  helpDesk: {
    code: 0,
    data: { common: { linkUrl: 'https://example.com/helpdesk', message: '20条新消息' }, data: helpDeskItems },
    message: 'OK',
  },
  notices: {
    code: 0,
    data: { common: { linkUrl: 'https://example.com/notices', message: '10条未读消息' }, data: noticeItems },
    message: 'OK',
  },
  inventoryOverview: {
    code: 0,
    data: { common: { linkUrl: null }, data: inventoryOverview },
    message: 'OK',
  },
  inventoryAge: {
    code: 0,
    data: { common: { linkUrl: 'https://example.com/inventory-age' }, data: inventoryAge },
    message: 'OK',
  },
  funds: {
    code: 0,
    data: { common: { linkUrl: 'https://example.com/funds' }, data: fundsCards },
    message: 'OK',
  },
  rebatePlaza: {
    code: 0,
    data: { common: { linkUrl: 'https://example.com/rebate' }, data: rebateSlides },
    message: 'OK',
  },
  taskBeans: {
    code: 0,
    data: { common: { linkUrl: 'https://example.com/tasks' }, data: taskSlides },
    message: 'OK',
  },
  banner: {
    code: 0,
    data: { common: { linkUrl: null }, data: bannerSlides },
    message: 'OK',
  },
}
