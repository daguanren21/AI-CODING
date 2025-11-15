# Buyer Center 设计基线

| 模块 | Node ID | 关键样式摘录 | 参考 |
| --- | --- | --- | --- |
| Banner Carousel（横向卡片） | 80:927 | - 卡片尺寸 449px × 252px，圆角 24px<br>- 标题 Arial Bold 22px/#121212，描述 Arial Regular 16px/#121212<br>- 底部渐变 `linear-gradient(rgba(241,249,255,0), #fff)`，无阴影<br>- 右下角箭头 24px Icon<br>- 图片蒙版 938×938 | [Figma 截图](https://www.figma.com/design/hzA9Hl250xkzjsCoPPoxgQ?node-id=80-927) |
| Banner Carousel Variant | 94:9825 | - 同样 24px 圆角，背景 #F2F5FF<br>- 多卡片并排 16px 间距，列宽 252px / 449px<br>- “New Arrivals” 标题 22px，描述 16px；箭头 Icon 24px<br>- 卡片底部 24px padding，图片蒙版 `mask-size: 252x449` | [Figma 截图](https://www.figma.com/design/hzA9Hl250xkzjsCoPPoxgQ?node-id=94-9825) |
| 库龄柱状图 | 894:31687 | - 左侧标签：Arial 14px/#666；副标题 Microsoft YaHei 12px/#999<br>- 主色 #FFA238，圆角 4px，条高 24px<br>- 右端数字 12px/#FFA238，垂直排列（数量 + 百分比）<br>- 条形宽度由 flex 决定，左右 padding 8px / 4px | [Figma 截图](https://www.figma.com/design/hzA9Hl250xkzjsCoPPoxgQ?node-id=894-31687) |
| Index Dialog | 2083:44844/44845/44856/44859/44982<br>2083:44886-44895<br>1580:39853<br>1568:38148/37023/37028/37030/37031 | - 对话框 960px × 776px，padding 32px，圆角 24px，阴影 0 24px 60px rgba(4,8,20,0.22)<br>- Header（2083:44856）分值 Arial Bold 48px/#193465，背景 #EFF3FF，Max/Frequency Arial 12px/#5F76A7，capsule pill 间距 12px<br>- Radar（2083:44859）背景 #F8FBFF，padding 24px，360px 模块含 339×201 雷达，轴标签白底 2px×4px，权重：35/5/30/15/15/-10<br>- 维度列表（2083:44886-44895）宽 397px，行高 30px，label Microsoft YaHei 14px/#193465，trend icon 24px（上升 #2CB67D，下降 #FA5E43，持平 #7A8199），badge Penalty 背景 #FA5E43/#FFF<br>- Suggestions（1580:39853+1568:38xxx）行高 56px，title Arial Bold 16px/#193465，desc Arial 14px/#5E6A7E，CTA 92×28px 边框 #2861CE，hover 填充 #2861CE/#FFF；Primary “View details”，Secondary “5 tips to improve” | [Figma 链接](https://www.figma.com/design/4zSfDDD6jpA17jATWYrQWO/2025%E5%B9%B48%E6%9C%88%E4%BB%BD%E4%B8%9A%E5%8A%A1?node-id=2083-44844&m=dev) |

> 若需图像参考，请使用 MCP `figma.get_screenshot` 捕获 Header/Score/Radar/Dimensions/Suggestions 节点 PNG，并同步到 `docs/testing/giga-index/`。

_Updated: 2025-11-12 15:20 CST_
