import fs from 'node:fs'
import path from 'node:path'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const baselinePath = process.argv[2]
const actualPath = process.argv[3]
const outPath = process.argv[4]
const threshold = Number(process.argv[5] ?? 0.1)
if (!baselinePath || !actualPath || !outPath) {
  console.error('Usage: node diff-figma.js <figma.png> <actual.png> <out.png> [threshold]')
  process.exit(1)
}
const baseBuf = fs.readFileSync(baselinePath)
const actBuf = fs.readFileSync(actualPath)
const base = PNG.sync.read(baseBuf)
const act = PNG.sync.read(actBuf)
if (base.width !== act.width || base.height !== act.height) {
  console.error('size_mismatch', { base: [base.width, base.height], act: [act.width, act.height] })
  process.exit(2)
}
const { width, height } = base
const diff = new PNG({ width, height })
const diffPixels = pixelmatch(base.data, act.data, diff.data, width, height, { threshold })
const diffPercent = (diffPixels / (width * height)) * 100
fs.writeFileSync(outPath, PNG.sync.write(diff))
console.log(JSON.stringify({ diffPixels, diffPercent: Number(diffPercent.toFixed(2)), outPath }, null, 2))
