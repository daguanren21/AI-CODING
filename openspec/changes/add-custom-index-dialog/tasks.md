## Implementation Checklist

- [ ] 1. 阅读 docs/plans/2025-11-18-custom-index-dialog.md、PRPS/custom-index-dialog.md、#57791需求.md 及 openspec list/specs，明确 Figma 节点、数据约束、交互（含“giga”）与约束。
- [ ] 2. 用 figma MCP 核实节点 1601-52946/52949/52958/52961/52962/52987/52988/52996/52997/53084/1580-39853/1580-40007/2068-38677 的尺寸/色值/字体并记录到计划，**无需导出截图**；Figma 基准图由你提供，路径 apps/web/playwright/custom-index/figma-custom-index.png。
- [ ] 3. 在 apps/web/src/components/base-info/types.ts 与 baseInfoData.ts 补充 CustomIndexDetail/Dimension/Penalty/Suggestion 接口与 mock 数据（77.52/100.00，35/5/30/15/15 权重，平台得分、惩罚列表、建议列表）。
- [ ] 4. 扩展 apps/web/src/api/baseInfo.ts，提供获取 Custom Index detail 的 HTTP 封装及 mock/fallback，供对话框加载。
- [ ] 5. 扩展 apps/web/src/stores/baseInfoStore.ts，加入 customIndexDetail、isCustomIndexDialogOpen、open/close/load/detail actions 与 getters（customIndexScore/dimensions/penalties/suggestions），含错误回退处理。
- [ ] 6. 修改 BaseInfoMetricCard.vue：card.id === 'custom-index' 时开启 openCustomIndexDialog，保留 hover 下划线，并支持键盘 Enter/Space。
- [ ] 7. 修改 BaseInfoSection.vue：挂载 CustomIndexDialog，连接 store 状态，传递 loading/detail 数据。
- [ ] 8. 新增 `apps/web/src/components/base-info/dialogs/CustomIndexDialog.vue` 与 `custom-index/CustomIndexRadar.ts / CustomIndexDimensionList.vue / CustomIndexSuggestionPanel.vue`，实现雷达、维度/平台得分/惩罚列表、建议区，统一使用 `box-sizing: border-box`。
- [ ] 9. 在 apps/web/src/theme/colors.ts、apps/web/uno.config.ts 注入 #193465/#4877FF/#2861CE/#FA5E43/#EFF3FF 及 `custom-index-section` shortcut，确保 UnoCSS 可用。
- [ ] 10. 更新 locales/app/en.json、locales/app/zh-CN.json（及必要时 apps/web/src/constants/links.ts），补充 customIndex.dialog.\* 文案：title/subtitle/lastUpdated/frequencyNote/penaltyLabel/suggestion_cta_one/\_other/no_suggestion/tips/help_link。
- [ ] 11. 编写 Vitest：store（apps/web/src/stores/**tests**/baseInfoStore.spec.ts）、Dialog/Radar/Section（apps/web/src/components/base-info/custom-index/**tests**/\*.spec.ts），mock ECharts，覆盖 open/load/fallback 分支。
- [ ] 12. 编写 Playwright MCP 用例 apps/web/playwright/tests/custom-index-dialog.spec.ts；生成 actual 截图 apps/web/playwright/custom-index/custom-index-dialog-actual.png；使用提供的基准图 apps/web/playwright/custom-index/figma-custom-index.png 跑 diff（apps/web/scripts/diff-figma.js），阈值 ≤ 2%。
- [ ] 13. 运行 `pnpm --filter @custom/web lint`、`pnpm --filter @custom/web test:run -- --runTestsByPath ...`、`pnpm --filter @custom/web typecheck`、`pnpm --filter @custom/web build`、`g -n "giga"`、UTF-8 校验，记录结果。
- [ ] 14. 运行 `openspec validate add-custom-index-dialog --strict`，如有错误修复后重跑并更新状态。
