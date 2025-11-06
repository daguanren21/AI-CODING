## Implementation Checklist
- [x] 1. 更新 `specs/ui-main-content/spec.md` / `proposal.md` / `tasks.md`，对齐 Figma 视觉、Swiper 交互与真实文案
- [x] 2. 扩展主题色与 UnoCSS（`theme/colors.ts`、`uno.config.ts`），新增渐变、胶囊、指示器等快捷类，保持与 BaseInfo 的宽高约束一致
- [x] 3. 重构左侧卡片（`TodoCard.vue`、`TodoCardGrid.vue`、`todoOverviewData.ts`），替换真实 icon、数值与 hover 效果
- [x] 4. 使用 Swiper 重写右侧模块（`DueSoonPanel.vue`、`DueSoonItem.vue`、`useTodoCarousel.ts`），支持自动轮播、hover 暂停以及自定义 `groupSize`
- [x] 5. 调整 `TodoOverview.vue` 结构，保证与 BaseInfo 同宽、左右等高，并统一排版字体
- [x] 6. 新增 / 完善 Vitest 覆盖：待办卡片、近七天面板、轮播 hook（含 hover 暂停、指示器切换）
- [x] 7. 安装 / 验证 Swiper 依赖并运行 `pnpm --filter @custom/web test:run --coverage`、`pnpm --filter @custom/web dev`、`openspec validate add-home-todo-overview --strict`
