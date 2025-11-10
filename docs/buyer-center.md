# Buyer Center 开发指南

## 本地调试
- 启动：`pnpm --filter @custom/web dev:buyer-center`
- 访问：`http://192.168.16.141:5173`
- 若需 Playwright MCP 对比，保持 dev server 运行后执行 `pnpm --filter @custom/web test:ui`

## 文件编码（UTF-8）
- 如遇 `��`、`锘�` 等乱码，使用脚本：
  ```bash
  node scripts/convert-to-utf8.mjs --from gbk <file...>
  ```
- 建议一次性传入多个 Vue/MD 文件，确保输出为 UTF-8。

## 视觉基线
- 设计节点参考 `docs/design/buyer-center-style-map.md`
- 基线截图存放在 `apps/web/playwright/baseline/`
- 若 Figma 有更新，使用 MCP `figma.get_screenshot` 重新导出并覆盖对应图片。
