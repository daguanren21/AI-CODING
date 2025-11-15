---
# Index Dialog（Codex 生成实践）
---

## 议程
- 背景与目标
- Monorepo 结构（VitePress + Slidev）
- 生成流程与提示词策略
- Demo（文档站 + 幻灯）
- 复盘与经验
- Q&A

---
## 背景与目标
- 面向团队内部分享：将“生成过程与方案”沉淀为一体化体系
- 以中文为主，后续可扩展英文版

---
## Monorepo 结构
- packages/docs → 运行 VitePress 指向 docs/
- packages/slides → 运行 Slidev 指向 slides/index-dialog/
- Turbo 统一编排 dev/build/export

---
## 生成流程（摘要）
- 提示词基线 → 约束与规范 → 代码生成 → 校验与改进 → 回归与复盘
- 质量门：lint/typecheck/test/build，及 UI 对比（按需）

---
## Demo 提示
- 打开两个终端：`pnpm dev:docs` 与 `pnpm dev:slides`
- 修改计划文档与幻灯片，实时预览

---
## 复盘
- 常见坑与对策（依赖、路径、主题、导出）
- 后续计划（CI/CD、主题规范）

---
## 目标（来自计划）
- 严格复刻 Figma 提供的 Index 对话框（参考节点 2083:44844 等），让 Buyer Center 中的指标雷达、维度列表与建议区域在视图、交互、Mock 数据、Store 状态与测试中对齐。

---
## 架构要点（摘要）
- 在 apps/web/.../modules 内用 Element Plus ElDialog 构建 Vue 3 组件，内部嵌入 ECharts 雷达图、维度列表、建议列表；数据来自 Pinia BuyerCenterStore（Mock 由 ServiceStructure 包裹），通过 BuyerDashboardShell 的 CTA 打开；样式使用 UnoCSS + buyer tokens + scoped CSS。

---
## 技术栈（摘要）
- Vue 3 + TypeScript、Element Plus、ECharts、Pinia、Vitest + Vue Testing Library、UnoCSS、自定义 buyer tokens

---
## 任务总览
- 设计走查与素材采集
- 类型与 Mock 数据扩展
- Pinia Store 扩展
- Index Dialog 组件
- Buyer Dashboard Shell 集成
- 文档与验证
- 关联模块微调

---
## 如何本地运行
- 安装依赖：`pnpm -C packages/docs i`，`pnpm -C packages/slides i`
- 开发：`pnpm dev:docs` 与 `pnpm dev:slides`（两个终端）
- 构建/导出：`pnpm build:docs`；`pnpm build:slides` 或 `pnpm export:slides:pdf|png`

---
## 部署（GitHub Pages）
- 本仓库包含 workflow：.github/workflows/pages-mono.yml
- 站点根下：/docs（文档）、/slides（幻灯）

---
## 从模板创建新演示
- 参考文档站模板：/AI-CODING/docs/templates/slidev/template.zh.html
<!-- template-ref:slidev -->