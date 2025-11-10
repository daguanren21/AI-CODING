## Why
- 主页当前只呈现 SiteHeader，缺少 Figma node 833-27929 所定义的 40px 间距与 1600px/1200px 宽度约束。
- BaseInfo 模块没有渲染问候语、custom Index、Beans 以及招商经理卡片，导致 node 833-28679 与 89-10615 的交互完全缺失。
- 现有 spec/proposal 中包含乱码，评审及实现团队无法准确读取需求，需要改写为 UTF-8 文案。

## What Changes
- 构建 BaseInfo Summary 行：按 node 833-27929 排列问候语、等级徽章、ID、custom Index、Beans、招商经理入口及分隔线。
- 复刻 node 833-28679 的 metric hover 行为与 node 89-10615 的招商经理 Popover；以 Element Plus + UnoCSS 完成布局与交互。
- 将 BaseInfo mock 数据、theme tokens、Uno shortcuts、Vitest 覆盖率、openspec 文档全部更新为 UTF-8 并与 Figma 数值保持一致。

## Impact
- 主要触及 apps/web/src/components/base-info/*、apps/web/uno.config.ts、apps/web/src/theme/colors.ts 与 SiteHeader，需运行 pnpm --filter @custom/web test:run --coverage 维持 100%。
- BaseInfo 颜色与弹层阴影将通过 theme tokens 共享，可能影响其它复用 Uno shortcuts 的区域。
- 需要在叙述和 tasks 中引用 Figma 节点，方便设计/QA 校对。

