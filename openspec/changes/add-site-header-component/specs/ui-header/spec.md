## ADDED Requirements
### Requirement: Header Layout Matches Figma Node 89:16339
The application SHALL render a header identical to the Figma reference, including the utility bar, navigation, search pill, quick access icons, and user info block.

#### Scenario: Utility Bar Links
- **WHEN** the page loads
- **THEN** the 40px top bar shows "USA / $, 帮助中心, Buyer 中心, 消息中心(99+), 退出"
- **AND** each entry is separated by a 1px divider.

#### Scenario: Main Navigation Content
- **WHEN** the main navigation renders
- **THEN** the brand logo appears on the left and the center displays "首页 / 新品速递 / 即将到货 / 限时促销 / 更多 / 品类"
- **AND** the right side includes the search pill, locale selector, quick buttons, and user info block.

### Requirement: Theme Tokens Exported
All header colors MUST be exposed as reusable tokens via `themeColors` and CSS variables.

#### Scenario: Theme Colors
- **WHEN** theme utilities are imported
- **THEN** the following hex values are exposed: background #050506, primary text #FFFFFF, secondary text #CBCBCB, divider #E5E5E5, input background #F4F5F7, accent #4E6AFF.

### Requirement: Advanced Filter Capsule
The header MUST display the "高级筛选" capsule (Figma node 766:83220) on the right-hand action cluster with icon + text inside a translucent pill.

#### Scenario: Advanced Filter Rendering
- **WHEN** the header actions are rendered
- **THEN** a rounded pill (height 24px, transparent white background) shows the filter icon and the text "高级筛选"
- **AND** the pill aligns with other action pills on the right-hand side.

### Requirement: Product Search Capsule
The header MUST implement the product search capsule from Figma node 766:83207, including the “Products” dropdown pill, placeholder text, and search icon button.

#### Scenario: Product Search Layout
- **WHEN** the search area is rendered
- **THEN** it contains a sub-pill labeled "Products" with a down arrow, placeholder text “Shower doors”, and a search icon button on the right
- **AND** the entire capsule maintains the translucent white background and rounded-full shape.

### Requirement: Complete Test Coverage
Header and theme modules MUST reach 100% line/branch/function/statement coverage.

#### Scenario: Coverage Threshold
- **WHEN** running `pnpm --filter @custom/web test:run --coverage`
- **THEN** the Vitest report shows 100% for all metrics
- **AND** `SiteHeader` tests assert text, interactions, and theme tokens.

### Requirement: Prefer Element Plus Components
Where Figma elements match available Element Plus widgets, the implementation SHALL use Element Plus components unless doing so would require extensive style overrides.

#### Scenario: Component Choice
- **WHEN** building header pills, inputs, or buttons that align with an Element Plus component
- **THEN** the component should be rendered via Element Plus (e.g., `ElInput`, `ElButton`)
- **AND** if matching the design would require large custom overrides, a bespoke implementation may be used instead.

### Requirement: Prefer UnoCSS Utilities
UnoCSS atomic classes SHOULD be the default styling mechanism; scoped CSS is only allowed when a layout requires verbose utilities or complex overrides, and repeated atomic combinations MUST be extracted into shortcuts.

#### Scenario: Styling Strategy
- **WHEN** applying colors, spacing, or layout to header elements
- **THEN** use UnoCSS classes (or declared shortcuts) instead of custom CSS
- **AND** only fall back to scoped styles when the Uno expression would be excessively long or needs Element Plus overrides.
