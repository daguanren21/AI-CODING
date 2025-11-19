# Custom Index Dialog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans。实现前仅需用 figma MCP 核实 Figma 节点（尺寸/颜色/字体），不必导出截图；执行阶段按核实结果逐项核对。

**Goal:** 落地 #57791 需求，按 Figma 设计实现 Custom Index 弹窗，覆盖 5 维雷达图、维度列表、惩罚项、建议面板等内容。

**Architecture:** BaseInfoMetricCard 触发 Pinia BaseInfoStore 的 CustomIndexDialog；Dialog 使用 Element Plus + UnoCSS，CustomIndexRadar 由 ECharts 渲染，CustomIndexDimensionList 展示维度与惩罚/趋势，CustomIndexSuggestionPanel 展示建议。

**Tech Stack:** Vue 3 <script setup> + TypeScript、Pinia、Element Plus、ECharts 6、UnoCSS、Vue I18n、Vitest + Vue Testing Library、Playwright MCP、figma MCP、pnpm workspace。

---

## Task 1: 背景理解 & 设计拆解

- **文件**：#57791需求.md、PRPS/custom-index-dialog.md、docs/plans/2025-11-18-custom-index-dialog.md、openspec specs、docs/design/buyer-center-style-map.md。
- 记录业务指标含义、更新频率、平台得分逻辑、i18n/安全/可访问性要求。
- 使用 figma MCP 核实节点 1601-52946/52949/52958/52961/52962/52987/52988/52996/52997/53084/1580-39853/1580-40007/2068-38677 的尺寸/颜色/字体并写入计划，**无需导出截图**；Figma 基准图由产品/设计提供，路径：`apps/web/playwright/custom-index/figma-custom-index.png`。
- 在计划中标出必要交互：Custom Index 与 BaseInfo Summary 的入口、metrics hover 辅助线、Openspec 约束项等。

### Figma 节点核实（2025-11-19）

| Node ID    | 描述                  | 尺寸 (W×H)  | 字体                                               | 主要色值 / 样式                                                                                                                                 |
| ---------- | --------------------- | ----------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1601:52946 | Custom Index 弹窗整体 | 900×776 px  | Microsoft YaHei（正文 14/16）、Arial（得分 16/22） | 弹窗底色 #FFFFFF，头部文字 #193465，雷达容器背景 #EFF3FF，右侧列表行背景 #FFFFFF，建议区背景 #F7F8FA，CTA/链接 #2861CE，告警色 #FF6600/#E64545  |
| 1601:52949 | 弹窗标题 “GIGA Index” | 670×25 px   | Arial Bold 22                                      | 文本 #193465，左右分割线 252 px，颜色 #D6D9E4                                                                                                   |
| 1601:52958 | 得分副标题            | 852×21 px   | Microsoft YaHei 16（主文案）/14（频率说明）        | 主文本 #333333，分母 #666666，频率说明 #999999                                                                                                  |
| 1601:52961 | 指标头部（雷达+列表） | 852×248 px  | 标签 12 px Microsoft YaHei；分数 Arial 16 Bold     | 雷达轴文字 #193465，雷达底 #EFF3FF，列表行底 #FFFFFF，分数 tag #FF6600，下降箭头 #E64545，平台扣分文字 #E64545，CTA 背景 #EFF3FF / 文本 #2861CE |
| 1601:52962 | 雷达图核心            | ≈314×198 px | Microsoft YaHei 12                                 | 标签 #193465，折线 #4877FF，面积填充 rgba(72,119,255,0.22)                                                                                      |
| 1601:52987 | 维度列表容器          | 348×204 px  | Microsoft YaHei 14/12、Arial 16                    | 行距 24 px，图标底 #E5F0FF，标题 #193465，权重 #666666，CTA 胶囊背景 #EFF3FF、文字 #2861CE                                                      |
| 1601:52988 | 单条维度行            | 348×24 px   | Microsoft YaHei Bold 14；Regular 14；Arial Bold 16 | 分数 #FF6600，箭头 #E64545，冒号 #999999                                                                                                        |
| 1601:52996 | 分数组件              | 62×24 px    | Arial Bold 16                                      | 文本 #FF6600，箭头 #E64545，圆角 3 px                                                                                                           |
| 1601:52997 | “n 项优化建议” Pill   | 108×24 px   | Microsoft YaHei 12                                 | 背景 #EFF3FF，文字/箭头 #2861CE，左右内边距 12/8 px                                                                                             |
| 1601:53084 | 指标详情 & 优化建议区 | 852×378 px  | 标题 16 Bold、列表 14、按钮 12                     | 外背景 #F7F8FA，卡片 #FFFFFF，序号圆点 #4877FF，链接 #2861CE，提示灰 #666666                                                                    |
| 1580:39853 | 建议区标题栏          | 852×53 px   | Microsoft YaHei Bold 16                            | 文本 #333333，左侧 icon 渐变 #4877FF→#2861CE                                                                                                    |
| 1580:40007 | 建议列表              | 852×325 px  | Microsoft YaHei 14 正文 / 12 CTA                   | 列表卡片 #EFF3FF + 内层 #FFFFFF，CTA 链接 #2861CE，数字圆点描边 #D6E1FF                                                                         |
| 2068:38677 | 底部帮助文案          | 852×18 px   | Microsoft YaHei 14，行高 18                        | 主文案 #666666，链接 #2861CE                                                                                                                    |

## Task 2: 类型扩展与 Store 改造

- **文件**：apps/web/src/components/base-info/types.ts、baseInfoData.ts、apps/web/src/api/baseInfo.ts、apps/web/src/stores/baseInfoStore.ts。
- 定义 CustomIndexDetail、CustomIndexDimension、PenaltyItem、SuggestionItem 接口。
- mock 数据 mockCustomIndexDetail：77.52/100.00，含 5 维权重、平台得分、惩罚列表、建议列表。
- Store 新增 customIndexDetail、isCustomIndexDialogOpen、open/close/load 以及 getters：customIndexScore、customIndexDimensions、customIndexPenalties、customIndexSuggestions。
- API 暴露 detail 接口（可 mock），保持可回落逻辑。

## Task 3: 组件实现

- **文件**：
  - BaseInfoMetricCard.vue：在 card.id === 'custom-index' 时支持 @click 打开弹窗，保留 hover 状态。
  - BaseInfoSection.vue：注册 CustomIndexDialog。
  - 新增 dialogs/CustomIndexDialog.vue：ElDialog + 头/分值/雷达/维度/惩罚/建议，统一 box-sizing: border-box。
  - 新增 custom-index/CustomIndexRadar.ts、CustomIndexDimensionList.vue、CustomIndexSuggestionPanel.vue。
- **样式**：扩展 apps/web/src/theme/colors.ts、apps/web/uno.config.ts，加入 #193465/#4877FF/#2861CE/#FA5E43/#EFF3FF 等 token，添加 custom-index-section shortcut。
- **可访问性**：CTA 设置 aria-label/aria-expanded，外链 target="\_blank" rel="noopener"。

## Task 4: i18n 与文案

- **文件**：locales/app/en.json、locales/app/zh-CN.json，如有链接额外在 apps/web/src/constants/links.ts。
- 添加/更新 customIndex.dialog.title/subtitle/lastUpdated/frequencyNote/penaltyLabel/suggestion_cta_one/\_other/no_suggestion/tips/help_link 等键值。
- 先写 en.json，再同步 zh-CN，保持 ESLint 通过。
- 避免硬编码字符串，组件中全部引用 i18n。

## Task 5: 验证与对比

- **Vitest**：
  - CustomIndexDialog.spec.ts：mock store，覆盖打开/关闭、数据渲染、维度列表与惩罚/建议分支。
  - CustomIndexRadar.spec.ts：mock echarts，断言 setOption 调用与 dispose。
  - BaseInfoSection.spec.ts：验证 metric card 触发 dialog。
- **Playwright MCP**：运行 apps/web/playwright/tests/custom-index-dialog.spec.ts，生成实际截图 `apps/web/playwright/custom-index/custom-index-dialog-actual.png`。
- **Figma diff**：使用你提供的基准图 `apps/web/playwright/custom-index/figma-custom-index.png`，执行：
  node apps/web/scripts/diff-figma.js --figma apps/web/playwright/custom-index/figma-custom-index.png --actual apps/web/playwright/custom-index/custom-index-dialog-actual.png --out apps/web/playwright/custom-index/custom-index-dialog-diff.png，确保 diff ≤ 2%。
- **静态检查**：pnpm --filter @custom/web lint、typecheck、build；g -n "giga"；UTF-8 校验。

---

## Desired Codebase Tree

`ext
apps/web/src/components/base-info/
├─ BaseInfoSection.vue
├─ BaseInfoMetricCard.vue
├─ dialogs/CustomIndexDialog.vue
├─ custom-index/
│  ├─ CustomIndexRadar.ts
│  ├─ CustomIndexDimensionList.vue
│  ├─ CustomIndexSuggestionPanel.vue
│  └─ __tests__/
│     ├─ CustomIndexDialog.spec.ts
│     └─ CustomIndexRadar.spec.ts
├─ baseInfoData.ts
├─ types.ts
└─ __tests__/BaseInfoSection.spec.ts
apps/web/src/stores/
├─ baseInfoStore.ts
└─ __tests__/baseInfoStore.spec.ts
locales/app/en.json
locales/app/zh-CN.json
apps/web/src/constants/links.ts (如有)
apps/web/playwright/custom-index/
docs/testing/custom-index/
docs/design/custom-index-dialog.md
PRPS/custom-index-dialog.md
`

## Validation Plan

- pnpm --filter @custom/web lint
- pnpm --filter @custom/web test:run -- --runTestsByPath apps/web/src/components/base-info/custom-index/**tests**/CustomIndexDialog.spec.ts apps/web/src/stores/**tests**/baseInfoStore.spec.ts --coverage
- pnpm --filter @custom/web typecheck
- pnpm --filter @custom/web build
- Playwright + diff 使用你提供的基准图（apps/web/playwright/custom-index/figma-custom-index.png），详见 Task 5
- UTF-8 校验：
  g -n "?" 应无匹配

## Implementation Checklist

1. 记录 #57791 需求、业务含义、Figma 节点、openspec spec 的关键约束
2. 用 figma MCP 核实 Figma 节点尺寸/颜色/字体并记录（无需截图；基准图由你提供，apps/web/playwright/custom-index/figma-custom-index.png）
3. 补全 TypeScript 接口、mock 数据、Pinia store 与 API
4. 接入 BaseInfo 入口并注册 Dialog 按钮事件
5. 完成 CustomIndexDialog 及子组件，统一 box-sizing: border-box
6. 注入 color token / Uno shortcuts
7. 更新 i18n 文案并引用到组件
8. 补充可访问性属性与外链安全
9. Vitest：store + Dialog + Radar + DimensionList + SuggestionPanel 覆盖 100%
10. Playwright 生成 actual（apps/web/playwright/custom-index/custom-index-dialog-actual.png）；用提供的基准图跑 diff ≤ 2%
11. pnpm --filter @custom/web lint/typecheck/build 全通过
12. g -n "giga" 确认无误写
13. UTF-8 校验，确认无乱码与问号
