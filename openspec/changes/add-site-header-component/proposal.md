## Why
- 头部需要与 2025 年 7 月业务稿 (node 89:16339) 对齐，现有应用只有占位卡片。
- 设计稿内的主题色目前没有统一出口，导致其它页面无法复用。
- 团队要求新增组件必须具备 100% 覆盖率测试保障。

## What Changes
- 新增 `SiteHeader` 组件、主题 token (`theme/colors.ts` + `styles/theme.css`) 并在 `App.vue` 中接入。
- 在 ui-header delta 中描述布局、主题值与新增的“高级筛选”“产品搜索”元素要求。
- 引入 Testing Library / Vue Test Utils，补充 `SiteHeader` 与主题测试，强制 Vitest 100% 覆盖。

## Impact
- 需要安装额外 devDependencies（@vue/test-utils、@testing-library/vue、@testing-library/jest-dom）。
- App 页面结构更新为“头部 + 内容区”，并在头部右侧展现高级筛选胶囊与产品搜索胶囊。
- CI 将在 `pnpm --filter @custom/web test:run --coverage` 阶段 enforce 100% 覆盖率。
