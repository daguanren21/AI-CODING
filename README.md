# Custom Monorepo

## 项目概览
- 基于 Vite + Vue 3 + TypeScript 的前端脚手架，使用 pnpm Workspace 管理多包结构。
- 默认 UI 方案为 Element Plus + UnoCSS，测试框架为 Vitest（jsdom 环境）。
- 目标是保持一套可直接扩展的生产级基础设施，确保后续需求可以在现有约定下快速落地。

## 环境要求
- Node.js ≥ 20
- pnpm 10（仓库启用了 `only-allow pnpm`）
- Windows/macOS/Linux 皆可，但请避免在配置中写入特定平台路径。

## 快速开始
1. 安装依赖：`pnpm install`
2. 启动全部工作区的开发任务：`pnpm run dev`
3. 只启动 Web 应用：`pnpm --filter @custom/web dev`
4. 构建与测试：`pnpm run build`、`pnpm run test`

## 常用脚本速查
- `pnpm --filter @custom/web dev`：启动 `apps/web` 的 Vite 开发服务器。
- `pnpm --filter @custom/web build`：产出前端构建产物。
- `pnpm --filter @custom/web test:run --coverage`：运行 Vitest 并生成覆盖率报告。
- `pnpm lint`（如后续接入 ESLint/Prettier，可统一放置于此处）。

## UI 开发规范
- **Figma MCP 必须二次校验**：每次实现或修改 UI 前，使用提供的 Figma 链接通过 MCP 获取节点详细数据（布局、字号、颜色、资源地址），并截屏留存参考。禁止凭记忆或截图改动。
- **严格 1:1 还原设计**：版式、尺寸、渐变、阴影、交互动效都以 MCP 返回的数据为准。若需偏离，必须在 spec/PR 中说明原因并获得确认。
- **UnoCSS 为首选样式方案**：优先使用原子类或在 `apps/web/uno.config.ts` 中新增快捷类，避免在组件内写大段自定义 CSS。
- **Element Plus 组件优先**：能用现成组件实现的设计稿应首选 Element Plus；若必须自定义，请在变更说明中解释理由。
- **资源管理**：Figma 导出的 SVG/Icon 需落地在 `apps/web/src/assets/` 下，命名使用 kebab-case。

## 测试与覆盖率
- `pnpm --filter @custom/web test:run --coverage` 是默认验证命令，任何提交前必须通过。
- 项目约定 **行/分支/函数覆盖率保持 100%**。若因声明文件（`.d.ts`）导致统计异常，请在 MR 中说明，但不可降低阈值。
- 新增 UI 组件至少提供一个 Vitest 组件测试（例如渲染快照或关键交互）。
- 若出现 Swiper、Element Plus 等第三方交互导致的警告，需在测试桩中显式声明事件或 props，确保日志干净。

## TypeScript 与目录约定
- `apps/web/tsconfig.app.json` 必须继承 `./node_modules/@vue/tsconfig/tsconfig.dom.json`。
- 组件使用 `<script setup>` + Composition API，文件命名保持 kebab-case，组件名使用 PascalCase。
- 公共类型放在 `apps/web/src/types/`，对外暴露的类型使用 `.d.ts` 声明并保持同步。

## Git 工作流
- `main` 仅用于发布，不得直接推送。
- 特性/修复分支以 `feature/#<需求号>`、`fix/#<缺陷号>`、`hotfix/#<紧急号>` 命名。
- 开发完成后通过 PR 合入 `main`，禁止跳过评审；解决冲突需在本地完成再推送。
- PR 标题和描述仅保留需求/缺陷 ID（例如 `#1501`），保持自动化流程可靠。
- 禁止从非 `main` 分支继续衍生新的需求分支；如需合并到特定环境，创建临时 merge 分支（`feature/#1501-merge-uat`）并在合并后删除。

## OpenSpec / 规范化流程
- 在新增能力、重构架构、引入重大 UI 变更前，先阅读 `openspec/project.md` 与相关 spec，必要时新建 `openspec/changes/<change-id>/` 的 proposal/tasks/spec。
- 变更命名使用动词开头的 kebab-case（如 `add-home-todo-overview`）。
- 编写完 proposal 与 spec delta 后运行 `openspec validate <change-id> --strict`，修复校验错误再提交。
- 已上线的变更需要在后续 PR 中归档到 `openspec/changes/archive/YYYY-MM-DD-<change-id>/`。

## 常见问题
- **pnpm 命令无法执行**：确认系统未限制脚本执行（Windows 需 `Set-ExecutionPolicy RemoteSigned`）。
- **Swiper 警告或控制台噪音**：在测试桩中补充 `emits` 或必要的事件处理，确保 Vitest 输出干净。
- **覆盖率不足**：检查是否有条件分支未触发，或是否引入了新的源文件却没有测试。

如需更多背景，可查阅 `openspec/AGENTS.md`、`openspec/project.md`，或在 PR 中附上相关设计/需求链接。
