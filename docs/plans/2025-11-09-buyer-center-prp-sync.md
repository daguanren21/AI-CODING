# Buyer Center PRP Sync Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

> ⚠️ **Archive Note:** 相关 OpenSpec 产物已迁移至 `openspec/changes/archive/add-buyer-center-dashboard/`。

**Goal:** 将 `PRPS/Buyer-Center.md` 中所有尚未写入 OpenSpec 的字段（组件、UI、服务、Mock 结构等）同步到 `openspec/changes/add-buyer-center-dashboard/` 下的 proposal/tasks/spec/design。

**Architecture:** 先审阅 PRP 文档与当前 OpenSpec 产物，列出差异清单；逐个更新 `proposal.md`、`tasks.md`、`specs/buyer-center/spec.md`、`design.md`，必要时补充新的 Requirements/Scenarios；最后重新运行 `openspec validate --strict` 确认通过。

**Tech Stack:** PowerShell、OpenSpec CLI、Markdown、rg、Figma 参考链接。

### Task 1: 差异盘点

**Files:**
- 读取: `PRPS/Buyer-Center.md`
- 读取: `openspec/changes/add-buyer-center-dashboard/{proposal.md,tasks.md,design.md,specs/buyer-center/spec.md}`

**Steps:**
1. `rg -n "平台" PRPS/Buyer-Center.md` / `rg -n "实时库龄" PRPS/Buyer-Center.md` 找出所有需求段。
2. 建立差异表：哪些字段（如 Card padding=16x8、整区高度860px、服务结构 details/agreement_qty 等）已覆盖，哪些缺失（如 banner 仅有图片链接、资金模块 Figma 链接、Mock details/enum、服务依赖等）。
3. 记录差异结果（可在临时记事或注释中）。

### Task 2: 更新 proposal.md

**Files:**
- 修改: `openspec/changes/add-buyer-center-dashboard/proposal.md`

**Steps:**
1. 在 What/Impact 部分加入 PRP 其余字段（Card 样式、三栏布局、平台公告/小秘书条目限制、轮播单条数据=一屏、资金/返点/任务等模块提要）。
2. 强调 Mock 结构（`details` 字段、枚举、链接行为）与 Figma MCP 参考要求。
3. 确认 Rollout 未遗漏（继续引用 validate 命令）。

### Task 3: 更新 tasks.md

**Files:**
- 修改: `openspec/changes/add-buyer-center-dashboard/tasks.md`

**Steps:**
1. 将 PRP 中尚未提及的模块/行为写入 checklist（例如 banner 仅图片、资金模块、店铺返点合约广场数据结构、做任务领云仓豆奖励逻辑、空态展示）。
2. 明确 Mock/类型创建步骤（如 `details.agreement_qty` 等）与 API 行为（link icon、空态文案、轮播指示器）。
3. 确保所有步骤使用 `[ ]` 语法，保持可执行顺序。

### Task 4: 更新 specs/buyer-center/spec.md

**Files:**
- 修改: `openspec/changes/add-buyer-center-dashboard/specs/buyer-center/spec.md`

**Steps:**
1. 审查现有 Requirements；为缺失的功能补充要求或 Scenario，例如：
   - Card 组件 tip/link/空态（若已有则核对数值）
   - Layout（860px、gap 16px、列内 gap、三栏模块列表）
   - 服务契约：`details` 字段、`IInventoryAge` 结构、`common.linkUrl`。
   - Banner/返点/任务轮播的“单条数据=一屏”与图片占位。
   - 资金模块、库存概览、平台小秘书/公告条数限制的表现。
2. 若 PRP 引入新字段（如 `horizontal_segments`），添加相应 MUST/Scenario。
3. 确保每个 Requirement 至少一个 Scenario，使用 MUST/SHALL 语言。

### Task 5: 更新 design.md

**Files:**
- 修改: `openspec/changes/add-buyer-center-dashboard/design.md`

**Steps:**
1. 描述新增模块的组件树位置（资金、返点、任务、banner）。
2. 记录平台公告/小秘书高度联动、轮播交互、空态样式、Mock 数据来源等细节。
3. 添加实时库龄图的实现小节（若已有则充实 `details`及 label/颜色 逻辑）。

### Task 6: 验证

**Files:**
- 读取: `openspec/changes/add-buyer-center-dashboard/**`

**Steps:**
1. 运行 `openspec validate add-buyer-center-dashboard --strict`。
2. 如有错误，依提示修正 Markdown 语法或 Scenario。
3. 验证通过后，列出更新文件与关键新增点，准备向用户汇报。

IMPLEMENTATION CHECKLIST:
1. `rg -n` /人工比对，整理 PRP vs Spec 差异。
2. 更新 `proposal.md`，覆盖 PRP 其余字段描述。
3. 更新 `tasks.md` checklist，加入所有模块/Mock 步骤。
4. 更新 `specs/buyer-center/spec.md`，新增/完善 Requirements & Scenarios。
5. 更新 `design.md`，补全组件与数据流细节。
6. 运行 `openspec validate add-buyer-center-dashboard --strict`，确保通过。
7. 汇总结果，告知用户已同步的字段与文件。
