# Custom Monorepo

## 安装与运行
- 使用 `pnpm install` 安装依赖（`pnpm-workspace.yaml` 管理 `apps/*` 与 `packages/*`）。
- 常用脚本：
  - `pnpm run dev`：通过 Turbo 调用全部 Workspace 的 `dev` 任务。
  - `pnpm --filter @custom/web dev`：仅启动 `apps/web` 的 Vite 开发服务器。
  - `pnpm run build` / `pnpm run test`：运行仓库级构建与测试管线。

## TypeScript 配置规范
- `apps/web/tsconfig.app.json` **必须**继承 `./node_modules/@vue/tsconfig/tsconfig.dom.json`（以工作区相对路径引用），否则在 pnpm workspace / VS Code 中会出现 “找不到文件” 的类型报错。
- 新增子项目时沿用该相对路径模式，确保编辑器与 `vue-tsc` 均能解析。

## 技术栈
- Vite + Vue 3 + TypeScript
- Element Plus
- UnoCSS
- Vitest

## Git 提交流程规范
- **主分支 `main` 只作发布线**：禁止直接在 `main` 上提交或修改，保持提交历史干净。
- **所有特性 / 修复都基于 `main` 新建分支**，分支命名遵循格式：`feature/#<需求号>` 或 `fix/#<缺陷号>`（例如 `feature/#78871`、`fix/#67783`）。
- 在分支上完成开发、测试后提交 Pull Request 合入 `main`。如出现冲突，必须先在当前分支解决，再发起或更新 PR。
- 禁止跳过 PR 直接 merge；确保 CI 与代码审查通过后再合入。
