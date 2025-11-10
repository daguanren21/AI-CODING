# Buyer Center 设计基线

| 模块 | Node ID | 关键样式摘录 | 参考 |
| --- | --- | --- | --- |
| Banner Carousel（横向卡片） | 80:927 | - 卡片宽 449px / 252px，圆角 24px<br>- 标题 Arial Bold 22px/#121212，描述 Arial Regular 16px/#121212<br>- 底部渐变 `linear rgba(241,249,255→#fff)`，无投影<br>- 右下角箭头 24px Icon<br>- 图片蒙版 938×938 | [Figma 截图](https://www.figma.com/design/hzA9Hl250xkzjsCoPPoxgQ?node-id=80-927) |
| Banner Carousel Variant | 94:9825 | - 同样 24px 圆角，背景 #F2F5FF<br>- 多卡片并排 16px 间距，列宽 252px/449px<br>- “New Arrivals” 标题 22px，描述 16px；箭头 Icon 24px<br>- 卡片底部 24px padding，图片蒙版 `mask-size: 252x449` | [Figma 截图](https://www.figma.com/design/hzA9Hl250xkzjsCoPPoxgQ?node-id=94-9825) |
| 库龄柱状条 | 894:31687 | - 左侧标签：Arial 14px/#666；副标题 Microsoft YaHei 12px/#999<br>- 主色 #FFA238，圆角 4px，条高 24px<br>- 右端数字 12px/#FFA238，垂直排列（数量 + 百分比）<br>- 条形宽度由 flex 决定，左右 padding 8px / 4px | [Figma 截图](https://www.figma.com/design/hzA9Hl250xkzjsCoPPoxgQ?node-id=894-31687) |

> 若需导出本地基线，使用 MCP `figma.get_screenshot` 保存 PNG，再复制到 `apps/web/playwright/baseline/`。
