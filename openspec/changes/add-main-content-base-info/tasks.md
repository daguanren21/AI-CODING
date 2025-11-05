## Implementation Checklist
- [ ] 1. 将 BaseInfo proposal/spec/tasks 及 SiteHeader 相关 delta 的乱码修复为 UTF-8，可读地引用 Figma 节点。
- [ ] 2. 在 apps/web/src/theme/colors.ts 与 apps/web/uno.config.ts 中补全 BaseInfo 所需 token、CSS 变量与 Uno shortcuts。
- [ ] 3. 重写 apps/web/src/components/base-info/baseInfoData.ts 与 types.ts，提供问候语、GIGA Index、Beans、招商经理等 mock 数据。
- [ ] 4. 依据 Figma node 833-27929/833-28679/89-10615 更新 BaseInfoSection.vue、BaseInfoMetricCard.vue、BaseInfoManagerCard.vue，优先使用 UnoCSS。
- [ ] 5. 统一 SiteHeader.vue 及相关测试中的中文文案，确保导航/工具条/胶囊的显示文本完整。
- [ ] 6. 更新 BaseInfo 与 SiteHeader 的 Vitest 测试（含 App.spec.ts）以覆盖新的数据与交互，确保 hover 行为通过。
- [ ] 7. 运行 pnpm --filter @custom/web test:run --coverage 并执行 openspec validate add-main-content-base-info --strict（若 header delta 受影响则一并校验）。
