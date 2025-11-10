#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import iconv from 'iconv-lite'

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: node scripts/convert-to-utf8.mjs [--from gbk] <file...>')
  process.exit(1)
}

let sourceEncoding = 'gbk'
const files = []
for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--from') {
    sourceEncoding = args[++i] ?? sourceEncoding
    continue
  }
  files.push(arg)
}

files.forEach((file) => {
  const abs = resolve(file)
  const buffer = readFileSync(abs)
  const decoded = iconv.decode(buffer, sourceEncoding)
  writeFileSync(abs, decoded, 'utf8')
  console.log(`Converted ${file} from ${sourceEncoding} to UTF-8`)
})
