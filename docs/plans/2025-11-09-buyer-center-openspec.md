# Buyer Center OpenSpec Change Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 基于 PRPS/Buyer-Center.md 为 Buyer 中心仪表盘新增完整的 OpenSpec 变更（proposal/tasks/spec deltas），确保新功能在实施前获得批准。

> ⚠️ **Archive Note:** 本变更已归档，现有产物位于 `openspec/changes/archive/add-buyer-center-dashboard/`。

**Architecture:** 采用 OpenSpec 三阶段流程，创建唯一 `change-id`（推荐：`add-buyer-center-dashboard`），在 `openspec/changes/<id>/` 下撰写 `proposal.md`、`tasks.md`、必要的 `specs/*/spec.md`；引用 Figma 设计与数据结构要求，覆盖 Card 组件、三栏布局、各模块及 API 结构；最终通过 `openspec validate <id> --strict` 校验。

**Tech Stack:** OpenSpec CLI、Markdown、PowerShell、Figma 参考、现有 PRP 文档。

### Task 1: 收集上下文与确认范围

**Files:**
- 读取: `openspec/project.md`
- 读取: `PRPS/Buyer-Center.md`
- 读取: `openspec/specs/**/spec.md`

**Step 1: 列出当前变更与能力**
```
openspec list
openspec list --specs
```
预期：确认没有现成覆盖 Buyer 中心仪表盘的变更与能力名称。

**Step 2: 搜索相关规格**
```
rg -n "Buyer" openspec/specs
```
若存在相近能力，记录其路径以决定是否 MODIFIED 或 ADDED。

**Step 3: 研读项目/PRP 背景**
- `Get-Content openspec/project.md`
- `Get-Content PRPS/Buyer-Center.md`
提炼业务目标：三栏布局、Card 组件、服务契约、枚举等。

### Task 2: 选定 change-id 并搭建目录

**Files:**
- 创建: `openspec/changes/add-buyer-center-dashboard/`

**Step 1: 确认 ID 未占用**
```
Test-Path openspec/changes/add-buyer-center-dashboard
```
若存在，改用 `add-buyer-center-dashboard-2` 并在计划余处同步。

**Step 2: 搭建结构**
```
New-Item -ItemType Directory openspec/changes/add-buyer-center-dashboard/specs -Force
New-Item -ItemType Directory openspec/changes/add-buyer-center-dashboard/specs/buyer-center -Force
ni openspec/changes/add-buyer-center-dashboard/{proposal.md,tasks.md} -ItemType File
```
确保必要父目录存在；如需附加 `design.md`，此处一并 `ni`。

### Task 3: 起草 proposal.md

**Files:**
- 修改: `openspec/changes/add-buyer-center-dashboard/proposal.md`

**Step 1: 填写 Why/What/Impact**
- Why：Buyer 中心待办区需扩展多个概览模块，提高运营效率。
- What：描述 Card 组件、三栏布局、数据联动、Mock API 架构。
- Impact：列出受影响前端/后端、需要的 Figma 参考、潜在风险（高度联动、数据空态）。

**Step 2: 引用外部链接**
- 摘要 Figma URL、PRP 枚举定义。
- 明确非目标（如暂不实现真实 API，只定义契约）。

**Step 3: 提交初稿**
```
Set-Content openspec/changes/add-buyer-center-dashboard/proposal.md @"
## Why
...
"@ -Encoding UTF8
```
内容需遵照 OpenSpec 模板（Why / What Changes / Impact / Rollout）。

### Task 4: 编写 tasks.md（实现 checklist）

**Files:**
- 修改: `openspec/changes/add-buyer-center-dashboard/tasks.md`

**Step 1: 列出分步任务**
- 组件层（Card、轮播）
- 页面布局（三栏容器、间距）
- 数据层（枚举、服务接口）
- QA/验证（Playwright、视觉验收）

**Step 2: 使用 `[ ]` 复选框语法**
示例：`- [ ] 实现 Card 组件样式 + tip 逻辑`

**Step 3: 引导未来实现**
按执行顺序排列（UI -> 数据 -> 状态管理 -> 测试）。

### Task 5: 撰写 specs delta

**Files:**
- 创建: `openspec/changes/add-buyer-center-dashboard/specs/buyer-center/spec.md`

**Step 1: 决定 ADDED vs MODIFIED**
- 若不存在 `specs/buyer-center`，使用 `## ADDED Requirements`。
- 若已有相关能力，复制现有结构并使用 `## MODIFIED Requirements`。

**Step 2: 描述要求**
包含至少以下 Requirement：
1. `Buyer Dashboard Card Shell`
2. `Buyer Dashboard Layout Columns`
3. `Buyer Dashboard Data Contracts`
4. `Buyer Dashboard Carousel Modules`

每个 Requirement 至少一个 `#### Scenario:`，例如：
```
#### Scenario: Display empty state when no data
- **WHEN** service returns empty `data`
- **THEN** Card renders “暂无数据” 空态图标
```

**Step 3: 引用服务结构**
嵌入 `ServiceStructure`、`IPlatformHelpDesk`、`IPlatformSystemNotice` 等字段要求（含枚举值语义）。

### Task 6: （可选）design.md 记录技术细节

**Files:**
- （可选）创建: `openspec/changes/add-buyer-center-dashboard/design.md`

内容：组件树、状态管理（Pinia store）、高度联动算法、轮播策略等，如团队需要更细技术指引。

### Task 7: 运行验证并整理输出

**Files:**
- 读取: `openspec/changes/add-buyer-center-dashboard/**`

**Step 1: 验证**
```
openspec validate add-buyer-center-dashboard --strict
```
若失败，按提示修复语法（特别是 Requirement/Scenario 标题格式）。

**Step 2: 汇总交付**
- 列出文件路径与关键点
- 准备提交供审批

**Step 3: 记录后续动作**
在 `docs/plans/...` 末尾注明执行下一步：提交提案、等待审核。

IMPLEMENTATION CHECKLIST:
1. 执行 `openspec list` 与 `openspec list --specs` 了解现状。
2. `rg -n "Buyer" openspec/specs` 搜索相关能力。
3. 阅读 `openspec/project.md` 与 `PRPS/Buyer-Center.md` 萃取需求。
4. 确认 `change-id`（默认 `add-buyer-center-dashboard`）未被占用。
5. 搭建 `openspec/changes/<id>/` 目录与基础文件。
6. 草拟 `proposal.md`（含 Why/What/Impact/Rollout、链接、非目标）。
7. 编写 `tasks.md`，罗列实现步骤复选框。
8. 创建 `specs/buyer-center/spec.md`，写 ADDED Requirements 与 Scenario。
9. （可选）补充 `design.md` 说明关键技术点。
10. 运行 `openspec validate <id> --strict` 并修复所有错误。
11. 输出最终文件清单，提交等待审核。
