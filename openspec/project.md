# Project Context

## Purpose
Monorepo starter focused on modern Vue 3 frontends. The current goal is to keep a minimal yet production-ready scaffold (Vite + Element Plus + UnoCSS + Vitest) that future features can build upon without redoing boilerplate or tooling.

## Tech Stack
- Node.js >= 20 with pnpm 10 for package management
- TurboRepo orchestrating workspace tasks (`dev`, `build`, `test`)
- Vite + Vue 3 + TypeScript in `apps/web`
- Element Plus UI library and UnoCSS atomic styling
- Vitest (with jsdom) for unit testing

## Project Conventions

### Code Style
- TypeScript strict mode everywhere; prefer `<script setup>` + Composition API.
- ESLint/Prettier not yet wired, but follow conventional Vue naming (PascalCase components, kebab-case files).
- Keep `App.vue` lean; shared styling should live in UnoCSS utilities over ad-hoc CSS.

### Architecture Patterns
- pnpm workspace: deployable apps live in `apps/` (currently `apps/web`); reusable libraries live under `packages/`.
- Turbo tasks define the single source of truth for build/test orchestration; root `package.json` scripts just delegate to Turbo.
- Configuration-first: each workspace owns its config (`vite.config.ts`, `uno.config.ts`, `vitest.config.ts`) but should follow conventions documented here.

### UI Component Usage
- Element Plus is the default UI library. If a Figma element can be implemented with an existing Element Plus component without heavy overrides, we must prefer the Element Plus component (for example `ElButton`, `ElInput`, `ElDropdown`).
- If recreating the design would require extensive custom styling, a bespoke implementation is allowed, but the PR/spec must explain why.
- UnoCSS atomic classes are the default styling approach. When utilities become repetitive or overly long, create shortcuts in `uno.config.ts`; only fall back to scoped CSS when overriding Element Plus or building complex layouts.
- Before touching any visual implementation, **you must** fetch the referenced node(s) via Figma MCP using the link provided in the task/spec. The fetched data (layout, typography, spacing, assets) is the single source of truth, and the UI must be implemented 1:1 with those values. Do not rely on memory or screenshots—always re-verify through MCP each time the design is referenced.

### Testing Strategy
- Vitest is required for unit/component tests; run via `pnpm test` (Turbo) or `pnpm --filter @custom/web test`.
- Default environment is `jsdom`; enable coverage with `vitest --coverage` when needed.
- Every new UI module should include at least a smoke test (component renders without throwing).

### Git Workflow
- `main` is release-only. Never commit directly to `main`.
- Branch naming: `feature/#<ticket>` (for example `feature/#78871`) or `fix/#<issue>` (for example `fix/#67783`).
- All work happens on feature/fix branches, merged via PR. Resolve merge conflicts on the branch before updating the PR.
- Commit messages follow conventional prefixes (`feature:`, `fix:`, `chore:`) and stay scoped to a single concern.
- PR rules:
  - Do not resolve conflicts on GitHub UI. Rebase/merge locally and push again.
  - PR Title/Description may only contain the requirement/issue ID (for example `#1501`). No additional prose.
  - If snapshot/sit/uat has conflicts: first merge `main` into your requirement branch. If multiple requirements must land together, create dedicated merge branches per requirement (`feature/#1501-merge-snapshot`) and delete them once merged.
  - Branches may only be created from `main` (never from SIT/UAT/snapshot branches) to avoid pollution.
  - Branch naming per scenario: `feature/#1501` for normal features, `fix/#1501` for production bugs, `hotfix/#1501` for urgent launch-day fixes.
  - Never continue bug fixes on a branch that has already shipped to production; create a new branch from `main`.
  - Temporary merge branches follow `feature/#<id>-merge-<env>` (for example `feature/#1501-merge-uat`) and must be deleted after use.
  - Preserve the auto-generated `git merge` commit message; tooling depends on its canonical format.

## Domain Context
Currently a generic web-app starter. Expect future work to revolve around dashboards or tooling UIs; keep Element Plus and UnoCSS available for rapid UI assembly.

## Important Constraints
- Node 20+ and pnpm only (`npx only-allow pnpm` runs on install).
- Windows dev environment: CRLF is acceptable, but Vite/Vitest configs assume POSIX-like paths, so avoid hardcoding OS-specific directories.
- Repository requires network access for NPM installs; offline development should rely on the existing lockfile.

## External Dependencies
- GitHub repository: `https://github.com/daguanren21/AI-CODING.git` (main branch).
- Element Plus CDN/assets, UnoCSS presets, and npm registry packages; ensure those sources remain reachable.

## OpenSpec Archive Notes
- `add-buyer-center-dashboard` 已在 2025-11-10 迁移至 `openspec/changes/archive/add-buyer-center-dashboard/`，相关 proposal/spec/tasks/design 均以归档形式保存，新增工作若需复用应复制到新的 change-id。

