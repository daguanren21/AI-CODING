# Buyer Center Dashboard Design Notes

## Component Tree
- `BuyerDashboardShell.vue`：承载三栏布局与栅格。
- `BuyerCard.vue`：通用卡片（title/tip/message/linkUrl/emptyText props + 默认 slot）。
- `BuyerCarousel.vue`：封装“单条数据=一屏”的轮播行为，沿用近七天到期的指示器与切换手势。
- `InventoryAgeChart.vue`：基于 ECharts 渲染实时库龄分布横向柱状图。

## State & Data Flow
- Pinia store `useBuyerDashboardStore`：
  - `fetchDashboard()` → `buyerCenterService` 返回 `ServiceStructure[]`。
  - `helpDeskHeight`（`useElementSize`）驱动公告列表裁剪。
  - `inventoryAge` state 保存 `horizontal/vertical/max_qty/segments`。
  - 计算属性派生公告展示条数、轮播页数、实时库龄 X 轴刻度。

## Height Synchronization
- 左列 `HelpDeskCard` / `NoticeCard` 共享 ref。
- `useElementSize(helpDeskRef)` → `computedNoticeRows = min(7, floor(height / 52))`。
- watch 高度变化时用 `requestAnimationFrame` 节流重新 slice 公告数据，避免抖动。

## Real-Time Inventory Age Chart
- 使用 ECharts `bar` + `yAxis.inverse = true` 实现横向柱状图。
- Y 轴 `axisLabel.formatter` 输出两行：`{day_desc}\n{storage_fee_desc}`。
- X 轴依据 `horizontal_segments` 生成刻度（0..max_qty，等距分段）。
- 系列数据来源于 `horizontal`：
  - `label.formatter` → 第一行 `qty`、第二行 `proportion`。
  - `itemStyle.color` 由 `style` 映射：highlight→#FF8B38、warning→#FFA238、default→#75A0F4。
- 顶部浮层禁用，改用柱体 label；坐标系 margin 需预留 label 2 行高度。

## Carousel Behavior
- Element Plus `ElCarousel`，`interval` 关闭自动播放，保留左右箭头。
- 当数据 <=1 条时隐藏箭头与 indicator，并禁用拖拽。
- `useSingleItemCarousel(data)` composable 统一管理当前索引、下一页逻辑、占位图。

## Testing Strategy
- Vitest：Card 空态 + tip snapshot、公告裁剪函数、`buildInventoryAgeSeries` 单元测试。
- Playwright MCP：
  - 校验轮播左右切换。
  - hover tip 显示。
  - 实时库龄图柱体颜色/标签（读取 canvas 上的 aria-data 或使用 `echartsInstance.getOption()`）。

## Open Questions
- 资金模块是否需要实时汇率同步？暂按静态 service。
- 实时库龄图是否需要自适应 theme mode？如需则扩展颜色映射。
