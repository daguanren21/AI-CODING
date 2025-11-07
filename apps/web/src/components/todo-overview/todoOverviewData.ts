import type { ITodoCard, IToDoListModule } from "./types"

import iconFullBid from "../../assets/todo-icons/full-bid.svg?url"
import iconProductRebate from "../../assets/todo-icons/product-rebate.svg?url"
import iconStoreRebate from "../../assets/todo-icons/store-rebate.svg?url"
import iconSpotDeposit from "../../assets/todo-icons/spot-deposit.svg?url"
import iconFuturesDeposit from "../../assets/todo-icons/futures-deposit.svg?url"
import iconExceptionOrder from "../../assets/todo-icons/exception-order.svg?url"
import iconDelivery from "../../assets/todo-icons/delivery.svg?url"
import iconService from "../../assets/todo-icons/service.svg?url"
import iconLogistics from "../../assets/todo-icons/logistics-claim.svg?url"
import iconReturn from "../../assets/todo-icons/return.svg?url"

export const mockTodoCards: ITodoCard[] = [
  { num: 100, title: "全款 BID 待支付", icon: iconFullBid },
  { num: 100, title: "产品返点协议履约中", icon: iconProductRebate },
  { num: 100, title: "店铺返点协议履约中", icon: iconStoreRebate },
  { num: 100, title: "现货保证金协议待支付", icon: iconSpotDeposit },
  { num: 100, title: "期货保证金协议待支付", icon: iconFuturesDeposit },
  { num: 100, title: "异常订单待处理", icon: iconExceptionOrder },
  { num: 100, title: "发货订单待提货", icon: iconDelivery },
  { num: 100, title: "保障服务待补充资料", icon: iconService },
  { num: 100, title: "物流索赔待补充资料", icon: iconLogistics },
  { num: 100, title: "退返品待跟进", icon: iconReturn },
]

export const mockDueSoonModule: IToDoListModule = {
  title: "近七天到期",
  total: 20,
  icon: iconDelivery,
  url: "https://example.com/todos/due-soon",
  groupSize: 3,
  items: [
    {
      title: "发货订单待提货",
      meta: "ID: LC20250307003",
      countdownDesc: "12 小时内",
      tag: { label: "紧急", tone: "critical" },
      url: "https://example.com/orders/LC20250307003",
    },
    {
      title: "异常订单待处理",
      meta: "ID: LC20250307003",
      countdownDesc: "1 天后",
      tag: { label: "紧急", tone: "critical" },
      url: "https://example.com/orders/exceptions",
    },
    {
      title: "店铺返点协议履约中",
      countdownDesc: "3 天后",
      tag: { label: "提醒", tone: "warning" },
      url: "https://example.com/contracts/store-rebate",
    },
    {
      title: "现货保证金协议待支付",
      countdownDesc: "4 天后",
      tag: { label: "提醒", tone: "warning" },
      url: "https://example.com/contracts/spot",
    },
    {
      title: "保障服务待补充资料",
      countdownDesc: "5 天后",
      tag: { label: "提醒", tone: "warning" },
      url: "https://example.com/service/support",
    },
    {
      title: "退返品待跟进",
      countdownDesc: "6 天后",
      tag: { label: "紧急", tone: "critical" },
      url: "https://example.com/returns/follow-up",
    },
  ],
}

