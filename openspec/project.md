# Project Context

## Purpose
Monorepo starter focused on modern Vue 3 frontends. The current goal is to keep a minimal yet production-ready scaffold (Vite + Element Plus + UnoCSS + Vitest) that future features can build upon without redoing boilerplate or tooling.

## Tech Stack
- Node.js ≥ 20 with pnpm 10 for package management
- TurboRepo orchestrating workspace tasks (`dev`, `build`, `test`)
- Vite + Vue 3 + TypeScript in `apps/web`
- Element Plus UI library and UnoCSS atomic styling
- Vitest (with jsdom) for unit testing

## Project Conventions

### Code Style
- TypeScript strict mode everywhere; prefer `<script setup>` + Composition API.
- ESLint/Prettier not yet wired, but follow conventional Vue naming (PascalCase components, kebab-case files).
- Keep `App.vue` lean; shared styling should land in UnoCSS utilities over ad-hoc CSS.

### Architecture Patterns
- pnpm workspace: deployable apps live in `apps/` (currently `apps/web`), reusable libraries will live under `packages/`.
- Turbo tasks define the single source of truth for build/test orchestration; root `package.json` scripts just delegate to Turbo.
- Configuration-first: each workspace owns its config (`vite.config.ts`, `uno.config.ts`, `vitest.config.ts`) but should reference shared conventions documented in `README.md`.

### UI Component Usage
- Element Plus 是默认 UI 组件库。只要 Figma 元素能用现有 Element Plus 组件复现且无需大规模样式覆写，就必须优先使用 Element Plus 组件（如 `ElButton`, `ElInput`, `ElDropdown` 等）。
- 若要完全还原设计需要大量定制样式，可以改用自定义实现，但需在 PR/Spec 中说明原因。

### Testing Strategy
- Vitest is required for unit/component tests; run via `pnpm test` (Turbo) or `pnpm --filter @custom/web test`.
- Default environment is `jsdom`; add coverage with `vitest --coverage` when needed.
- Every new UI module should include at least a smoke test (component renders without throwing).

### Git Workflow
- `main` is release-only. Never commit directly to `main`.
- Branch naming: `feature/#<ticket>` (e.g., `feature/#78871`) or `fix/#<issue>` (e.g., `fix/#67783`).
- All work happens on feature/fix branches, merged via PR. Resolve merge conflicts on the branch before updating the PR.
- Commit messages follow conventional prefixes (`feature:`, `fix:`, `chore:`) and stay scoped to a single concern.
- PR rules:
  - **Do not resolve conflicts on GitHub UI.** Rebase/merge locally and push again.
  - PR Title/Description may only contain the requirement/issue ID (e.g., `#1501`). No additional prose.
  - If snapshot/sit/uat has conflicts: first merge `main` into your requirement branch. If multiple requirements must land together, create dedicated merge branches per requirement (`feature/#1501-merge-snapshot`) and delete them once merged.
  - Branches may only be created from `main` (never from SIT/UAT/snapshot branches) to avoid pollution.
  - Branch naming per scenario: `feature/#1501` for normal features, `fix/#1501` for production bugs, `hotfix/#1501` for urgent launch-day fixes.
  - Never continue bug fixes on a branch that has already shipped to production—create a new branch from `main`.
  - Temporary merge branches follow `feature/#<id>-merge-<env>` (e.g., `feature/#1501-merge-uat`) and must be deleted after use.
  - Preserve the auto-generated `git merge` commit message; tooling depends on its canonical format.

## Domain Context
Currently a generic web-app starter. Expect future work to revolve around building dashboards or tooling UIs; keep Element Plus and UnoCSS available for rapid UI assembly.

## Important Constraints
- Node 20+ and pnpm only (`npx only-allow pnpm` runs on install).
- Windows dev environment: CRLF is acceptable, but Vite/Vitest configs assume POSIX-like paths—avoid hardcoding OS-specific directories.
- Repository requires network access for NPM installs; offline development should rely on existing lockfile.

## External Dependencies
- GitHub repository: `https://github.com/daguanren21/AI-CODING.git` (main branch).
- Element Plus CDN/assets, UnoCSS presets, and npm registry packages; ensure those sources remain reachable.
