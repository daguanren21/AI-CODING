# Buyer Center Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 按最新 Buyer Center PRP + OpenSpec，落地待办总览下的 3 栏仪表盘、统一 Card 组件、实时库龄 ECharts、Pinia 数据层与 Mock API。

**Architecture:** 在 `apps/web/src` 下新增 buyer-center 专属类型、API、Pinia Store 和组件目录；复用 Element Plus + UnoCSS，ECharts 用按需导入；Mock 数据由静态模块返回。主页面通过 `BuyerDashboardShell` 挂载所有模块。

**Tech Stack:** Vue 3 `<script setup>`, TypeScript, Pinia, Element Plus, UnoCSS, ECharts, Vitest, Playwright MCP。

### Task 1: 数据契约与 Mock 服务

**Files:**

- Create: `apps/web/src/types/buyerCenter.ts`
- Modify/Create: `apps/web/src/types/enum.ts`
- Create: `apps/web/src/mocks/buyerCenter.ts`
- Create: `apps/web/src/api/buyerCenter.ts`

**Steps:**

1. 在 `types/buyerCenter.ts` 定义：`IsReply`, `IsRead`, `MakeSureStatus`, `IPlatformHelpDesk`, `IPlatformSystemNotice`, `IInventoryAgeHorizontal`, `IInventoryAgeVertical`, `IInventoryAge`, `ServiceStructure<T>`。
2. 若 `types/enum.ts` 需复用枚举，导出基础 enum，再在 buyerCenter 类型里引用。
3. `mocks/buyerCenter.ts`：导出符合接口的静态数据（helpDesk、notices、inventory overview、inventory age、funds、banner、rebate plaza、task beans）。保证 `details.agreement_qty/available_qty/buyer_lock_qty`、`horizontal_segments/max_qty/total_qty` 字段齐全，`common.linkUrl` 控制跳转。
4. `api/buyerCenter.ts`：
   - 暴露 `fetchBuyerDashboard(): Promise<BuyerDashboardPayload>`，当前返回 mock。
   - 保留 future hook（如改接真实 API）via TODO。
5. 新增 `apps/web/src/api/index.ts` re-export（若需要）。

### Task 2: Pinia Store + Composables

**Files:**

- Create: `apps/web/src/stores/buyerCenterStore.ts`
- Modify: `apps/web/src/stores/__tests__/buyerCenterStore.spec.ts`（新建）
- Create: `apps/web/src/composables/useNoticeHeight.ts`（可选，封装高度联动）

**Steps:**

1. 建立 store：state 保存全部模块数据、`isLoading/isError`、`helpDeskHeight`, `noticeVisibleCount`, `inventoryAgeAxes`。
2. `fetchDashboard` 内调用 API，填充 state，处理错误（toast/console）。
3. `setHelpDeskHeight(height: number)` 计算 `noticeVisibleCount = min(7, floor(height / 52))`。
4. `inventoryAgeXAxis`：根据 `horizontal_segments` 生成 `[0, segmentSize * i]` 刻度。
5. getters：`leftColumnCards`, `carouselModules`, `inventoryAgeSeries`。
6. 单元测试：mock API，断言 `noticeVisibleCount` 及 `inventoryAgeXAxis` 逻辑。

### Task 3: 通用 Card 组件 & 辅助组件

**Files:**

- Create: `apps/web/src/components/buyer-center/BuyerCard.vue`
- Create: `apps/web/src/components/buyer-center/BuyerCardEmpty.vue`
- Create: `apps/web/src/components/buyer-center/__tests__/BuyerCard.spec.ts`

**Steps:**

1. BuyerCard props：`title`, `tip`, `message`, `linkUrl`, `icon`, `emptyText`, `emptyIcon`；slot 渲染内容。
2. Header 布局：左标题 + tip（`el-tooltip`），右 message + link icon（仅 link/message 存在时显示）。
3. Content：slot 含数据，否则使用 `BuyerCardEmpty` 提供统一空态。
4. 支持 UNO class/SCSS（如 `.buyer-card`）。
5. 测试：渲染 tip、link icon、空态。

### Task 4: 模块组件（平台小秘书/公告/库存/库龄/资金/返点/任务/banner）

**Files:**

- Create directory: `apps/web/src/components/buyer-center/modules/`
- Components：
  - `HelpDeskPanel.vue`
  - `NoticePanel.vue`
  - `InventoryOverviewPanel.vue`
  - `InventoryAgePanel.vue`
  - `BannerCarousel.vue`
  - `FundsPanel.vue`
  - `RebatePlazaCarousel.vue`
  - `TaskBeansCarousel.vue`
- Tests：`modules/__tests__/*.spec.ts`

**Steps:**

1. 每个模块内部使用 `BuyerCard`，接收 store 提供的数据。
2. 帮助面板：列表项 80px，显示 `msg_type_show`、倒计时（mock 文案即可）。`NoticePanel` 根据 `noticeVisibleCount` slice。
3. `InventoryOverviewPanel`：展示 KPI/环比（按照 PRP 数据结构设计）。
4. `InventoryAgePanel`：
   - 引入 ECharts（`import * as echarts` 或按需）。
   - Option：`yAxis` labels 自定义 formatter，`xAxis` 取自 store getter。
   - `series` 数据 map 自 `horizontal`。
   - 顶部 label 使用 `series.label.show = true`，`formatter` 返回 `{qty}
{proportion}`。

   - 处理 resize（`useResizeObserver`）。
5. Carousel 模块：Element Plus `ElCarousel`，`:autoplay="false"`；当数据 ≤1 条时隐藏指示器与箭头。
6. 资金/返点/任务：遵循 Figma spacing + icon（可用 SVG/Element 图标）。
7. 每个模块写 smoke test（渲染 + 主要文案）。

### Task 5: 布局容器与路由集成

**Files:**

- Create: `apps/web/src/components/buyer-center/BuyerDashboardShell.vue`
- Modify: `apps/web/src/components/todo-overview/TodoOverview.vue` 或 `App.vue`（挂载新模块）
- Tests：`components/buyer-center/__tests__/BuyerDashboardShell.spec.ts`

**Steps:**

1. Shell 负责 3 栏布局（CSS Grid 或 Flex）。
   - 容器高度 860px + gap 16px。
   - 左列：HelpDesk + Notice；中列：InventoryOverview + InventoryAge + BannerCarousel；右列：Funds + Rebate + TaskBeans。
2. 引入 store，`onMounted` 调 `fetchDashboard`。
3. 提供 loading/empty fallback。
4. 在 `TodoOverview.vue` 中导入 `BuyerDashboardShell`，放置在“待办总览模块下方”。
5. UNO 样式：`.buyer-dashboard`，`.buyer-dashboard__column`。
6. 测试：
   - 渲染 3 列。
   - Mock store 数据，断言 HelpDesk/Notice/InventoryAge 元素存在。

### Task 6: Playwright MCP & Vitest 端到端验证

**Files:**

- Update: `apps/web/src/components/__tests__/...`（Vitest）
- Update: `apps/web/playwright/buyer-center.spec.ts`（若无则创建）

**Steps:**

1. Vitest：运行 `pnpm --filter @custom/web test -- --runInBand`；新增 snapshot/logic 测试。
2. Playwright：编写脚本访问 `http://localhost:5173`（或 dev server），验证：
   - Card tip tooltip 显示。
   - Inventory age 柱体颜色 class（可通过 dataset 或 canvas fallback）。
   - Carousel 模块左右切换。
3. 如果项目已有 MCP 流程，用 `playwright-mcp --url http://localhost:8000 --test-user-journey`（或更新命令）验证 Buyer Dashboard 场景。

### Task 7: 文档 & 收尾

**Files:**

- Modify: `apps/web/README.md`
- Modify: `docs/buyer-center.md`（若存在）

**Steps:**

1. 记录新组件/类型/Mock 的使用方式与 Figma 链接。
2. 更新 README 的运行/测试命令。
3. `pnpm --filter @custom/web lint`（若有 lint 脚本） + `pnpm --filter @custom/web test`。
4. 列出提交信息建议（如 `feat: add buyer center dashboard shell`）。

IMPLEMENTATION CHECKLIST:

1. 定义 buyer center 类型/枚举 + Mock + API。
2. 创建 Pinia store、可选 composable，并写单测。
3. 实现 `BuyerCard` + 空态 + 对应测试。
4. 实现各模块组件（HelpDesk、Notice、InventoryOverview、InventoryAge、Funds、Rebate、TaskBeans、Banner）及测试。
5. 搭建 `BuyerDashboardShell`，嵌入 `TodoOverview`，配好布局与加载逻辑。
6. 补充 Vitest & Playwright 测试，确保通过。
7. 更新 README/文档，运行 lint & test，总结待提交内容。
