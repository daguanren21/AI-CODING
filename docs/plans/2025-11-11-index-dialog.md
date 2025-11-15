# Index Dialog Implementation Plan

> **For Claude:** 必须调用 superpowers:executing-plans 按顺序执行任务；每次引用 Figma 设计都先用 figma MCP 的 get_design_context + get_screenshot 获取节点，再实现 UI。

**Goal:** 严格复刻 Figma 提供的 Index 对话框（节点 2083:44844/44845/44856/44859/44982 及其下属 2083:44886-44895、1580:39853、1568:38148/37023/37028/37030/37031 等），让 Buyer Center 中的 指标雷达、维度列表与 Suggestions 区域在视图、交互、Mock 数据、Store 状态与测试中全部对齐。

> ⚠️ **1:1 还原要求：** 所有视觉、字号、间距、色值、阴影、交互状态必须与对应 Figma 节点像素级一致；若存在不可避免偏差，需要在本计划中记录原因与截图对比。

**Architecture:** 在 pps/web/src/components/buyer-center/modules 内以 Element Plus ElDialog 构建 Vue 3 组件，内部嵌入 ECharts 雷达图、维度列表、建议列表。所有数据来自 Pinia uyerCenterStore（mock 数据由 ServiceStructure 包裹），并通过 BuyerDashboardShell 的 CTA 打开。样式使用 UnoCSS + buyer-center tokens + scoped CSS；需要在 CSS 中加入项目统一的 box-sizing 约束。

> [2025-11-12 15:20 CST] Style map 已补充 “Index Dialog” 关键节点（2083:44844/44845/44856/44859/44982、2083:44886-44895、1580:39853、1568:38148/37023/37028/37030/37031），记录了 960×776 容器、339×201 雷达、397px 维度列以及 #193465/#4877FF/#2861CE/#FA5E43/#EFF3FF 等配色，后续样式直接引用。
**Tech Stack:** Vue 3 `<script setup>` + TypeScript、Element Plus、ECharts、Pinia、Vitest + Vue Testing Library、UnoCSS、自定义 buyer tokens。

### PROJECT STRUCTURE

```text

> **Figma 导出提示：** https://www.figma.com/design/4zSfDDD6jpA17jATWYrQWO/2025%E5%B9%B48%E6%9C%88%E4%BB%BD%E4%B8%9A%E5%8A%A1?node-id=2083-44844&m=dev —— 请导出 960px 宽 Index Dialog 截图并保存为 `docs/testing/giga-index/giga-dialog-figma.png`，供 diff 脚本使用。

---

### Task 1: 设计走查与素材采集

**Files:**  

- `docs/design/buyer-center-style-map.md`  
- 目标 Figma 节点：`2083:44844`, `2083:44845`, `2083:44856`, `2083:44859`, `2083:44982`, `2083:44886-44895`, `1580:39853`, `1568:38148/37023/37028/37030/37031` 等

**Steps:**

1. 严格按照 Figma 页面顺序（Header → Score → Index → Suggestions）逐段调用 figma MCP `get_design_context` + `get_screenshot`，并把节点 ID、主尺寸（如 Index 宽 852px/高 248px、雷达区 339×201、维度列宽 397px）记录到 plan。
2. 将 UI 字体（Arial Bold 22/16、Arial Regular 12、微软雅黑 14 等）、主色 (#193465/#4877FF/#2861CE/#FA5E43/#EFF3FF)、圆角、阴影、行高写入 plan，供样式实现引用。
3. 记录 Suggestions 区域的头部、内容行、产品能力区块的节点 URL，作为 Task4 模板的“必须对齐源”。
4. 若设计节点更新，立刻补充到 plan 并标记更新时间。

### Task 2: 类型与 Mock 数据扩展

**Files:** `apps/web/src/types/buyerCenter.ts`, `apps/web/src/mocks/buyerCenter.ts`

**Steps:**

1. 在 `buyerCenter.ts` 中新增：
   - `IGigaIndexScore`（`total`, `max`, `lastUpdated`, `frequencyNote`）。
   - `IGigaIndexDimension`（`id`, `label`, `weight`, `score`, `trend`, `badge`, `actionLabel`, `actionType`）。
   - `IGigaIndexSuggestion`（`id`, `title`, `description`, `cta`, `ctaUrl`）。
   - `IGigaIndexPayload`（嵌套 score/dimensions/suggestions）。
2. 扩展 `BuyerDashboardPayload`，加上 `gigaIndex: ServiceStructure<IGigaIndexPayload>`。
3. 在 mock 中定义 `const gigaIndexPayload: IGigaIndexPayload = { ... }`，数值对齐 Figma（总分 77.52/100、维度权重 35/5/30/15/15/-10，含 5 条建议）。
4. 把 `gigaIndex` 合并进 `mockBuyerDashboardPayload`，确保 `common.linkUrl` 与文案（“View details”“5 tips to improve”）可供组件直接使用。
5. 运行 `pnpm --filter @custom/web test:run -- --runTestsByPath apps/web/src/mocks/__tests__/*` 及 `pnpm --filter @custom/web typecheck` 保证数据结构合法。

### Task 3: Pinia Store 扩展

**Files:** `apps/web/src/stores/buyerCenterStore.ts`, `apps/web/src/stores/__tests__/buyerCenterStore.spec.ts`

**Steps:**

1. 引入 Task2 新类型，state/computed 中暴露：
   - `gigaIndex`, `gigaScore`, `gigaDimensions`, `gigaSuggestions`（找不到数据时返回安全默认值）。
2. 新增 `const isGigaDialogOpen = ref(false)` 以及 `openGigaDialog` / `closeGigaDialog`。
3. 导出 getter + actions，供 Shell 与 Dialog 复用。
4. 增补单测：mock payload，断言 getters 返回权重/得分数组，open/close 会切换布尔值。
5. 跑 `pnpm --filter @custom/web test buyerCenterStore`。

### Task 4: Index Dialog 组件

**Files:** `apps/web/src/components/buyer-center/modules/GigaIndexDialog.vue`, `apps/web/src/components/buyer-center/modules/__tests__/GigaIndexDialog.spec.ts`（如需可拆出 `GigaIndexRadar.ts`）

**Steps:**

1. 定义 props + emits：

   ```ts

   `defineEmits(['update:modelValue'])`。

2. 模板结构：
   - 使用 `ElDialog` + 自定义 header/footer，头部严格复刻节点 `2083:44845`（左侧标题 30px 行高，右侧关闭按钮 32px）。
   - Score 卡片使用节点 `2083:44856` 的排版（总分 42px 字号、frequency note 14px secondary 文案、`lastUpdated` 标签 12px capsule）。
   - `giga-dialog__index` 区域宽 852px、高 248px、padding 24px、圆角 24px、背景 #F8FBFF；内部 `display:flex`，`giga-dialog__radar` 与 `giga-dialog__dimension-list` 使用 `flex:1` 均分宽度并保持相同高度。
   - `giga-dialog__radar` 宽 339px、高 201px，保留 16px 顶部空隙，雷达标题与边框颜色取自 Figma。`giga-dimension__labels` 强制单行（`white-space: nowrap; text-overflow: ellipsis; overflow: hidden;`），以免遮挡。
   - `giga-dialog__dimension-list` 参考节点 `2083:44886-44895`：行高 30px（Penalty 行 24px），列宽 397px，左侧 icon 24×24、label 宽 109px、权重括号 26px、冒号 4px。`giga-dialog__dimension-item` 必须使用 Figma gap（左区 12px、右区 12px）。`giga-dimension__label` 字体为微软雅黑 14/18、颜色 #193465。
   - `giga-dimension__score` pill 取节点 `2083:44894` 值：`padding: 2px 4px`, `border-radius: 3px`, 文本 16px Arial Bold、颜色 #FF6600，趋势箭头 #E64545 9px。CTA `el-button` 以节点 `2083:44895` 为准：`width: 140px`, `height: 24px`, `border-radius: 100px`, 背景 #EFF3FF, 文本 #2861CE, 图标 16px，hover 状态深色。
   - Suggestions 板块先渲染节点 `1580:39853` 头部，再使用 `1568:38148/37023/37028/37030/37031` 的排版：产品能力头部有分割线，内容列表 `giga-suggestion-row` 高度 56px（包含 16px padding），文字 14px，CTA 取对应节点 CTA 类型。node-id 2083:44886 也作为列表行的 spacing 模板。
   - _2025-11-12 18:05：header 已按节点 2083:44845/44847 实现双渐变分隔线 + 22px Arial Bold 标题，并通过 `pnpm --filter @custom/web lint` 校验。_
   - _2025-11-12 18:25：Score 行已套用节点 2083:44856 的 “Index: 77.52/100 + Last Updated …（frequency）” 布局，支持 `frequencyNote` 动态更新。_
   - _2025-11-12 18:50：维度列表与 CTA pill 完成节点 2083:44885/44886/44887/44895 的 1:1 还原（包含 24px icon、权重括号、冒号、score/趋势箭头及 `View details`/`tips` 按钮）。_
   - _2025-11-12 18:58：对话框 padding/background/阴影 已直接绑定到 `.giga-dialog .el-dialog`，Score 区域改为横向居中以贴合 Figma。_
3. 样式：
   - 所有带 padding 的 `.giga-*` 类添加 `box-sizing: border-box;`，并集中在 scoped CSS 顶部加 `*, *::before, *::after { box-sizing: border-box; }` 防止再次遗漏。
   - 颜色、阴影、圆角、间距全部引用 buyer tokens 或在注释中标注源节点 ID；`giga-dialog__index` 使用 `box-shadow: 0 16px 32px rgba(25,52,101,0.08)`。
   - _现状：`.giga-dialog .el-dialog` 统一填充 32px + 圆角 32px + 阴影 `0 24px 60px rgba(4,8,20,0.22)`，`giga-score-row` 设置 `justify-content: center`。_
4. ECharts：
   - 初始化/销毁逻辑与 `InventoryAgePanel` 对齐，`watch(() => props.modelValue, ...)` 在 dialog 打开后延迟 render。
   - `indicator` 列表来自 `dimensions.map(d => ({ name: d.label, max: d.weight }))`；`axisNameGap = 20`，`axisName.textStyle.backgroundColor = '#fff'`，`padding: [2,4]` 防止遮挡文字。
   - 设置 `series[0].areaStyle` 渐变 (#8AB6FF → transparent) 与 `lineStyle.color = '#4877FF'`；hover tooltip 展示 `score/weight/trend`。
   - 若雷达图标签在不同语言或容器宽度下出现截断，优先调整 `grid` / `radius` / `center` 留白；若仍不满足则通过 `axisName.formatter` 自动插入换行（例如 `label.replace(' ', '\n')` 或每 N 个字符插入 `\n`），确保文案完整展示。
5. 测试：
   - `GigaIndexDialog.spec.ts` 覆盖：渲染 Score/维度行/Suggestions CTA、点击关闭触发 `update:modelValue(false)`、按钮点击回调透出 `action` 事件。
   - 跑 `pnpm --filter @custom/web test GigaIndexDialog`。
   - _2025-11-12 15:36：已定向执行 `pnpm --filter @custom/web test -- src/stores/__tests__/buyerCenterStore.spec.ts src/components/buyer-center/modules/__tests__/GigaIndexDialog.spec.ts src/components/buyer-center/__tests__/BuyerDashboardShell.spec.ts src/components/buyer-center/modules/__tests__/InventoryAgePanel.spec.ts`，全部通过。_
6. 模块注册：在 `modules/index.ts` 或 `BuyerDashboardShell` 中引入组件，确保 tree shaking & TS 类型正确。

### Task 5: Buyer Dashboard Shell 集成

**Files:** `apps/web/src/components/buyer-center/BuyerDashboardShell.vue`, 相关样式或测试文件。

**Steps:**

1. 在 `setup` 中读取 store 的 `isGigaDialogOpen`、`gigaScore`、`gigaDimensions`、`gigaSuggestions`，暴露开关方法。
2. 在内容区顶部新增 CTA（Element Plus `ElButton` + `TrendCharts` icon），点击时调用 `openGigaDialog()`。
3. 在模板底部挂载 `<GigaIndexDialog v-model:model-value="store.isGigaDialogOpen" ... />` 并传递 store 数据。
4. 补充 `.buyer-dashboard__toolbar` 样式，使 CTAs 与现有卡片对齐。
5. 在 `BuyerDashboardShell.spec.ts` 中模拟 store，断言 CTA 打开 dialog 且 `update:modelValue` 事件返回 `false` 时会关闭。
6. `pnpm --filter @custom/web test BuyerDashboardShell`。

### Task 6: 文档与验证

**Files:** `docs/design/buyer-center-style-map.md`, `openspec/changes/...`（如有）；测试脚本。

**Steps:**

1. 在 style map 中新增 “Index Dialog” 小节，列出所有节点 ID、字号、颜色、CTA 语文。
2. 使用 `pnpm --filter @custom/web lint`, `pnpm --filter @custom/web test`, `pnpm --filter @custom/web build` 进行常规验证。
   - _2025-11-12 15:35：`pnpm --filter @custom/web exec vue-tsc --noEmit` 与 `pnpm --filter @custom/web build` 已跑通。_
   - _2025-11-12 16:05：在 `apps/web/package.json` 添加 `"lint": "vue-tsc --noEmit"` 并执行 `pnpm --filter @custom/web lint`。_
   - _2025-11-12 16:33：定向测试再次通过；全量 `pnpm --filter @custom/web test` 仍仅因既有 `stores.spec.ts` / `BuyerCard.spec.ts` 失败，需要后续单独修复。_
3. 结合 superpowers:executing-plans 记录每个阶段的完成时间与截图。
4. 追加二次校验：通过 Playwright MCP（`apps/web/playwright` 场景）打开 dialog，分别截取 Figma 节点与本地浏览器渲染的同一视图，并生成 diff 图片（保存到 `docs/testing/giga-index/`），把链接记录在 plan 中。
   - _2025-11-12 16:18：`node apps/web/scripts/giga-index-diff.mjs` 已生成 `buyer-dashboard-actual.png`、`giga-dialog-actual.png`、`giga-dialog-diff.png`（diffPixels ≈ 1,828,943），当前偏差集中在卡片阴影、实时文案、CTA 状态，需继续迭代。_
5. 针对 diff 中暴露的样式偏差，逐条回到 `GigaIndexDialog.vue`/样式文件修复，直至 diff 结果只剩允许的 1px/颜色误差，并把修复摘要同步进 plan。
6. `git status -sb` 确认变更清单，准备提交/PR。

### Task 7: 关联模块微调

**Files:** `apps/web/src/components/buyer-center/modules/InventoryAgePanel.vue`, `apps/web/src/components/buyer-center/modules/TaskBeansCarousel.vue`

**Steps:**

1. 在 `InventoryAgePanel` 中移除 `Array.prototype.at`，改用 `ticks[ticks.length - 1]`；给 `useResizeObserver` 返回值保存 `StopHandle`，在 `onBeforeUnmount` 中调用；补充 `label.color` 直写 HEX，满足 `vue-tsc`。
2. 在 `TaskBeansCarousel` 中让 `TaskSlide` 继承 `ICarouselItem` 并新增 `tasks` 字段；更新 `BuyerCarousel` slot 遍历 `item.tasks`，保持类型安全。
3. 运行 `pnpm --filter @custom/web build` 再次确认无回归。

### Implementation Checklist

```text

_Updated: 2025-11-12 18:58 CST_




