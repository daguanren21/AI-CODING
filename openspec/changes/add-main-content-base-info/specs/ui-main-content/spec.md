## ADDED Requirements
### Requirement: BaseInfo Container Layout
The base-info container SHALL follow Figma node 833-27929: render it directly under `SiteHeader`, add 40px top padding, keep width 1600px when viewport >= 1920px, and lock width to 1200px with horizontal scrolling allowed when viewport < 1280px.

#### Scenario: Desktop Width
- **WHEN** the viewport width is at least 1920px
- **THEN** the container width is fixed at 1600px and centered
- **AND** there is 40px of space between the header and the container.

#### Scenario: Narrow Width
- **WHEN** the viewport width is below 1280px
- **THEN** the container width remains 1200px
- **AND** the browser shows a horizontal scrollbar instead of shrinking the layout.

### Requirement: BaseInfo Summary Content
The BaseInfo summary row MUST mirror the Figma layout and copy: greeting text, level badge, buyer ID, custom Index value, Beans count, and the "招商经理" entry in the same order as node 833-27929.

#### Scenario: Summary Rendering
- **WHEN** BaseInfo renders
- **THEN** the left side shows "Hi, {name}" plus the level badge
- **AND** the right side lists the ID, custom Index, Beans, and manager entry with the same dividers as the design.

### Requirement: Metric Link Hover
The custom Index and Beans text SHALL act as inline metric links that only add an underline on hover (no glow or shadow), matching node 833-28679.

#### Scenario: Hover Feedback
- **WHEN** a user hovers the custom Index or Beans text
- **THEN** the text displays an underline
- **AND** no additional visual effects appear.

### Requirement: Manager Hover Popover
The manager entry MUST use an Element Plus hover popover to display the contact card from node 89-10615 (avatar, title, phone, email, QR code).

#### Scenario: Popover Interaction
- **WHEN** a user hovers the "招商经理 · {name}" entry
- **THEN** a popover appears with the avatar, title, phone, email, and QR code
- **AND** the popover hides when the pointer leaves or the popover loses focus.

