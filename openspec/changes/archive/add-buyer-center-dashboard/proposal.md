## Why
- 待办总览区目前只有单一模块，无法承载平台小秘书、公告、库存概览、实时库龄、资金等高频信息，运营需要频繁切页。
- Figma（node-id:463-28146 等）已经交付 3 栏 860px 高度的统一视觉，需要在开发前用 OpenSpec 固化。
- 统一 Card 结构、数据契约和高度联动可以降低返工成本，并为后端接口提供参考。

## What Changes
- 新增 Buyer Center Dashboard 能力：待办总览下方渲染 3 栏、高度 860px、gap 16px 的 Card 布局，并支持 tip/空态。
- 规定平台小秘书与平台公告高度联动（公告高度 = 小秘书实际高度，基于 DOM 动态裁剪列表）。
- 轮播类模块（banner、店铺返点合约广场、做任务领云仓豆）使用“单条数据 = 一屏”的交互模型，与“近七天到期”保持一致。
- 新增实时库龄分布模块要求：使用 ECharts 实现横向柱状图，Y 轴两行（天数段 + 仓储费描述），X 轴按照 `horizontal_segments` 自动均分数量区间；柱体顶部显示数量与占比，颜色按照 `style` 值映射 highlight→#FF8B38、warning→#FFA238、default→#75A0F4。
- 记录统一服务契约（`ServiceStructure`、`IsReply`/`IsRead`/`MakeSureStatus` 等枚举，及实时库龄 `IInventoryAge*` 接口），`common.linkUrl` 控制 Card 右上跳转。
- UI 约束：使用 Element Plus + UnoCSS，tip 用 `el-tooltip`，空态显示图标+文案；本变更仅定义契约和 Mock，不落地真实 API。

## Impact
- **前端（apps/web）**：需要实现 Card、轮播、实时库龄图表及 Pinia/composable，把高度联动和颜色逻辑固化到组件中。
- **Mock/契约**：`src/types/enum.ts` 与 Mock service 必须输出新增的 `IInventoryAgeHorizontal/Vertical` 字段，供前端按区间绘制。
- **测试**：需补充 Vitest/Playwright 用例覆盖 Card 空态、tip、轮播导航、实时库龄配色与数据标签。
- **风险**：高度联动依赖 DOM 计算需节流，ECharts 在 3 栏布局下可能带来性能压力，需评估懒加载策略。

## Rollout
1. 完成本次 OpenSpec（proposal/tasks/spec delta）并通过 `openspec validate add-buyer-center-dashboard --strict`。
2. 评审通过后，按 tasks checklist 执行实现与测试。
3. 功能上线后，归档变更并合并 delta 至正式 specs。


