## Why
- 现有待办总览未对齐 Figma 463-28491 相关页面：缺少真实 SVG icon、标题排版、渐变背景与 hover 阴影
- 模块宽度/高度未与 BaseInfo 一致，1600px/1200px 的约束失效，页面出现割裂感
- “近七天到期” 未按 Figma 使用 Swiper 自动轮播与自定义指示器，也缺少 hover 暂停/恢复、倒计时 pill 样式
- Mock 数据仍为占位符，导致视觉与交互评审无法进行

## What Changes
- 对 `theme/colors.ts` 与 `uno.config.ts` 扩展 token 与 shortcuts，覆盖标题字体、渐变、pill、指示器、hover 阴影
- 重构 `TodoOverview.vue`、`TodoCardGrid.vue`、`TodoCard.vue`，应用 5 列卡片、抬升 hover、真实 SVG icon 与中文文案
- 使用 Swiper 重写 `DueSoonPanel.vue`、`DueSoonItem.vue` 并更新 `useTodoCarousel.ts`，实现 3 条/组轮播、鼠标进入暂停、指示器圆点、倒计时 pill
- 更新 `todoOverviewData.ts` mock 数据，补充 ID/倒计时 copy；新增 Vitest 覆盖（TodoOverview、DueSoonPanel、useTodoCarousel）
- 同步 `specs/ui-main-content/spec.md`/`tasks.md` 说明 hover 渐变、字体、指示器行为

## Impact
- 需要 `swiper` 运行时依赖（已存在），增加 UnoCSS 变量，需重新生成类型
- 修改多个 Vue 组件 + composable + 测试，需重新执行 `pnpm --filter @custom/web test:run --coverage` 与 `pnpm --filter @custom/web dev`
- 提升 UI/交互一致性并满足 100% 覆盖率要求