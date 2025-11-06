## MODIFIED Requirements
### Requirement: Todo Overview Width Matches BaseInfo Container
待办总览区块必须与 BaseInfo 相同宽度并放置在同一内容容器内，保持顶部 40px 间距。整体最宽 1600px、最小 1200px，并通过双栏栅格实现左右区域等高。

#### Scenario: Width And Height Alignment
- **WHEN** 视口宽度 ≥ 1920px
- **THEN** TodoOverview 外层宽度固定为 1600px，左右列等高且与 BaseInfo 对齐
- **AND** Section 顶部距 SiteHeader 40px

#### Scenario: Narrow Viewport
- **WHEN** 视口宽度 < 1280px
- **THEN** Section 宽度保持 1200px，出现水平滚动但不改变内部布局、每列高度保持一致

### Requirement: Copywriting And Card Styling
待办总览标题使用 “Microsoft YaHei” Bold 16px/#333，副标题使用 Regular 14px/#333。左侧十张卡片一行展示 5 张，卡片圆角 12px、背景渐变（#3E5CFF → #62A3FF），图标容器 34.8×40px，数字使用 Arial Bold 24px，悬停抬升 4px 并加深阴影（0 18px 36px rgba(27,61,157,0.24)）。

#### Scenario: Card Hover Elevation
- **WHEN** 鼠标悬停任意卡片
- **THEN** 卡片产生抬升动画并套用描边 `rgba(119,151,255,0.55)`，阴影变为 `0 18px 36px rgba(27,61,157,0.24)`，保持 5 列布局

### Requirement: Due Soon Panel Mirrors Figma Interaction
右侧 “近七天到期” 面板尺寸 320×216px，背景为 `rgba(255,255,255,0.5) → rgba(255,255,255,0)` 渐变，圆角 20px，描边半透明白。标题 16px Bold，右侧数量徽章为 20×20px 圆角 4px（背景 #FFF0E6、文字 #FF6600）。列表项白底、圆角 8px、边框 #F1F1F1，hover 呈现 `0 8px 20px rgba(0,0,0,0.06)` 阴影。倒计时 badge 区分紧急（背景 #E64545、白字）与提醒（背景 #FFF0E6、#FF6600）。

#### Scenario: Item Layout
- **WHEN** 渲染列表项
- **THEN** 顺序展示标题、可选 ID 元信息与倒计时徽章；徽章根据 tone 切换红/橙配色
- **AND** hover 时条目保留白底，仅出现阴影，不得改动文字颜色

#### Scenario: View All CTA
- **WHEN** `total > items.length` 且提供 url
- **THEN** 显示 14px 文本按钮 “查看全部”，无描边 hover 为下划线；否则隐藏

### Requirement: Swiper Carousel With Autoplay
列表必须通过 Swiper 自动轮播，默认每组 3 条，可通过 `groupSize` 自定义。指示器为 16×3px 的圆角条，激活色 #ADADAD，未激活 #D6D6D6。点击切换对应 slide，鼠标进入面板暂停轮播、离开恢复。

#### Scenario: Autoplay And Pause
- **WHEN** 鼠标进入面板区域
- **THEN** `autoplay.stop()` 被调用
- **AND** 鼠标离开恢复 `autoplay.start()`

#### Scenario: Indicator Control
- **WHEN** 用户点击指示器
- **THEN** Swiper 调用 `slideTo(index)`，并让对应指示条切换为激活色

### Requirement: View Data Consistency
左侧 10 张卡片文案固定（全款 BID 待支付…退返品待跟进）且数值展示 100。近七天列表展示 6 条示例数据，包含 “发货订单待提货(ID:LC20250307003)” 等 copy，对应 Figma 提供的倒计时文案（12 小时内、1 天后、3 天后等）。

#### Scenario: Data Rendering
- **WHEN** 加载默认 mock 数据
- **THEN** 看到 10 张卡片 + 6 条近七天记录，且第一条展示 ID 与 “12 小时内” 倒计时
