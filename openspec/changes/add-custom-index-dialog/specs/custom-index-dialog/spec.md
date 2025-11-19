# custom-index-dialog Specification

## ADDED Requirements

### Requirement: Custom Index Dialog Invocation

The BaseInfo custom Index metric SHALL open a modal dialog that loads detail data before rendering, matching Figma node 1601-52946.

#### Scenario: Button And Keyboard Trigger

- **WHEN** a user clicks the BaseInfo metric with `card.id === "custom-index"` or focuses it and presses Enter/Space
- **THEN** `useBaseInfoStore.openCustomIndexDialog()` sets `isCustomIndexDialogOpen` to true and, if `customIndexDetail` is empty, calls `loadCustomIndexDetail()` once per session.

#### Scenario: Graceful Fallback

- **WHEN** the detail request fails
- **THEN** the dialog keeps previously cached data if available, otherwise shows an i18n error string under the header and keeps `isCustomIndexDialogOpen` true until the user closes it via Element Plus dialog controls.

### Requirement: Score Header And Metadata

The dialog header SHALL display the score, max score, last updated date, and frequency note using the copy defined in `docs/plans/2025-11-18-custom-index-dialog.md` and Figma node 1601-52949/52958.

#### Scenario: Score Formatting

- **WHEN** detail.total is 77.52 and detail.max is 100.0
- **THEN** the header renders `Custom Index: 77.5/100.0` (score 1 decimal place, max 1 decimal place) and the subtitle `customIndex.dialog.lastUpdated` + formatted ISO date, followed by `customIndex.dialog.frequencyNote` text.

### Requirement: Radar Visualization And Dimension List

The dialog SHALL render an ECharts radar chart plus a dimension list, mirroring Figma nodes 1601-52961/52962/52987/52988/52996/52997.

#### Scenario: Radar Data Binding

- **WHEN** `customIndexDimensions` contains five entries (Product Competitiveness 35, Fulfillment Capability 5, Pricing Strategy 30, Promotion Strategy 15, Service Experience 15)
- **THEN** `CustomIndexRadar` sets indicator max to 100, weight labels per dimension, and renders the series with all five scores.

#### Scenario: Dimension Rows

- **WHEN** rendering the right-side list
- **THEN** each row displays icon, name, `{score.toFixed(2)}/{weight}%`, platform penalty value (if present) with `customIndex.dialog.penaltyLabel`, and a CTA link using `target="_blank" rel="noopener"`; rows with zero penalty omit the CTA.

### Requirement: Suggestion Panel And Accessibility

The dialog SHALL include a suggestion panel and assistive text region per Figma node 1601-53084/1580-39853/1580-40007/2068-38677, with full accessibility attributes.

#### Scenario: Suggestions Present

- **WHEN** `customIndexSuggestions.length > 0`
- **THEN** render cards listing title, description, tips, and primary CTA icon/button whose aria-label references `customIndex.dialog.suggestion_cta_one` or `_other` with count.

#### Scenario: No Suggestions

- **WHEN** there are zero suggestions
- **THEN** render a neutral state with `customIndex.dialog.no_suggestion` copy and hide CTA buttons.

#### Scenario: Help Link & Box Sizing

- **WHEN** the dialog footer renders helper text
- **THEN** it includes a help link to the Custom Index documentation constant, opens in a new tab, uses `aria-describedby`, and every container style enforces `box-sizing: border-box`.

### Requirement: Data, Tokens, And Validation

Implementation SHALL follow the data contracts, color tokens, and QA gates defined in the plan.

#### Scenario: Store Contracts

- **WHEN** accessing `useBaseInfoStore`
- **THEN** the store exposes `customIndexDetail`, `isCustomIndexDialogOpen`, `openCustomIndexDialog`, `closeCustomIndexDialog`, `loadCustomIndexDetail`, and computed getters `customIndexScore`, `customIndexDimensions`, `customIndexPenalties`, `customIndexSuggestions` with mock defaults (77.52/100.00, 35/5/30/15/15 weights, penalty list, suggestion list).

#### Scenario: Styling Tokens

- **WHEN** UnoCSS compiles `custom-index-section`
- **THEN** the new theme tokens (#193465, #4877FF, #2861CE, #FA5E43, #EFF3FF) are available as CSS variables in `apps/web/uno.config.ts` and referenced by dialog components.

#### Scenario: Test & Diff Validation

- **WHEN** the change ships
- **THEN** Vitest suites (store + dialog + radar), Playwright MCP test with screenshot diff (锟斤拷2% via `apps/web/scripts/diff-figma.js`), `pnpm --filter @custom/web lint/typecheck/build`, UTF-8 + `g -n "giga"` checks, and `openspec validate add-custom-index-dialog --strict` all pass.

