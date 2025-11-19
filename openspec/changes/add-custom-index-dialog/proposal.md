## Why

- BaseInfo 当前只有 Custom Index 概览（apps/web/src/components/base-info/BaseInfoSection.vue、BaseInfoMetricCard.vue），运营无法看到 5 个维度的得分、权重与平台扣分，违背 #57791 需求里“透明展示维度拆解”的要求。
- docs/plans/2025-11-18-custom-index-dialog.md 与 PRPS/custom-index-dialog.md 已明确 Figma 节点 1601-52946/52961、示例分数 77.52/100.00、平台扣分 CTA、i18n 文案和 1:1 对齐规范，这些内容尚未落到任何 OpenSpec change。
- 现有 add-main-content-base-info/specs/ui-main-content/spec.md 仅覆盖 Summary 布局与 hover 行为，没有 Custom Index Dialog、ECharts、Pinia store 扩展以及 MCP 截图与 lint/test/build 守门，必须新增 change 才能推进实现。

## What Changes

- **数据与 Store**：扩展 TypeScript 接口、mock 数据和 baseInfoStore，新增 `customIndexDetail`、Dialog 状态、open/load/close 动作以及 `customIndexScore/dimensions/penalties/suggestions` getters，同时暴露 `/base-info/custom-index` API（或 mock）以便拉取对话框明细。
- **UI 与组件**：BaseInfoMetricCard 在 `card.id === 'custom-index'` 时触发 Dialog；新建 `dialogs/CustomIndexDialog.vue`、`custom-index/CustomIndexRadar.ts`、`CustomIndexDimensionList.vue`、`CustomIndexSuggestionPanel.vue`，左侧绘制 ECharts Radar，右侧呈现维度/平台扣分，底部展示建议与提示。
- **样式与 Tokens**：在 `apps/web/src/theme/colors.ts`、`apps/web/uno.config.ts` 中注册 #193465/#4877FF/#2861CE/#FA5E43/#EFF3FF 等颜色，并新增 `custom-index-section` shortcut；所有包含 padding 的容器强制 `box-sizing: border-box`，颜色/间距 1:1 复刻 Figma。
- **i18n 与链接**：在 `locales/app/en.json`、`zh-CN.json`（及其余语言）新增 `customIndex.dialog.*` 文案，并在 `apps/web/src/constants/links.ts` 维护 Custom Index 帮助链接常量，确保 CTA/帮助入口能被键盘访问。
- **测试与验证**：补充 Vitest（store、Dialog、Radar、DimensionList、SuggestionPanel）、Playwright MCP（apps/web/playwright/tests/custom-index-dialog.spec.ts）、figma diff（docs/testing/custom-index/\*.png），并执行 `pnpm --filter @custom/web lint test:run typecheck build`、`g -n "giga"`、UTF-8 校验与 `apps/web/scripts/diff-figma.js` diff ≤ 2%。

## Impact

- 代码：`apps/web/src/components/base-info/*`、`apps/web/src/components/base-info/dialogs/CustomIndexDialog.vue`、`apps/web/src/components/base-info/custom-index/*`、`apps/web/src/stores/baseInfoStore.ts`、`apps/web/src/api/baseInfo.ts`、`apps/web/src/theme/colors.ts`、`apps/web/uno.config.ts`、`locales/app/*.json`、`apps/web/src/constants/links.ts`。
- 资产：`docs/testing/custom-index/` 截图、`docs/design/custom-index-dialog.md` 记录、Playwright MCP/figma MCP 依赖。
- 依赖与风险：ECharts 6、Pinia、Element Plus 版本需兼容；需要 superpowers（figma/playwright）与写权限生成截图；diff/测试失败会阻塞 change，必须在 `openspec validate add-custom-index-dialog --strict` 前修复。
