## 1. 规范与设计
- [x] 1.1 复查 openspec 项目规范，选用 change-id，并记录 Figma 参考。
- [x] 1.2 在 `specs/ui-header` 编写新增要求与场景，涵盖主题 token、测试门槛、以及“高级筛选 / 产品搜索”需求。

## 2. 主题与组件实现
- [x] 2.1 建立 `theme/colors.ts` 与 `styles/theme.css`，定义所有主题色。
- [x] 2.2 创建 `SiteHeader.vue`，覆盖 Utility Bar、导航、搜索、快捷入口。
- [x] 2.3 增加“高级筛选”胶囊与“产品搜索”胶囊，并完善样式/交互。
- [x] 2.4 更新 `App.vue` 引入头部并使用主题背景。

## 3. 测试与验证
- [x] 3.1 为 `SiteHeader` 撰写独立测试并扩展 `App.spec.ts`。
- [x] 3.2 扩展测试覆盖新增 UI，确保 `pnpm --filter @custom/web test:run --coverage` 依旧 100%。
- [x] 3.3 运行 `openspec validate add-site-header-component --strict`。
