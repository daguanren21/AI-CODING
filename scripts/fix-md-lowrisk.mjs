#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const exts = new Set(['.md'])
const roots = ['docs','slides']
const files = []
function walk(dir){
  for(const name of fs.readdirSync(dir, { withFileTypes: true })){
    const p = path.join(dir, name.name)
    if(name.isDirectory()){
      if(p.includes('node_modules') || p.includes('.vitepress/dist') || p.includes('.vitepress/.temp')) continue
      walk(p)
    } else if(exts.has(path.extname(name.name))) {
      files.push(p)
    }
  }
}
for(const r of roots){ if(fs.existsSync(r)) walk(r) }

let changed = 0
for(const f of files){
  let txt = fs.readFileSync(f, 'utf8')
  const lines = txt.split(/\r?\n/)
  let out = []
  for(let i=0;i<lines.length;i++){
    const line = lines[i]
    const prev = out.length ? out[out.length-1] : ''
    const next = i+1<lines.length ? lines[i+1] : ''
    const isHeading = /^#{1,6}\s/.test(line)
    const isFence = /^(\s*)```|^(\s*)~~~/.test(line)
    const isList = /^\s*([-*+]\s|\d+\.\s)/.test(line)
    // blank line before headings
    if(isHeading && out.length>0 && prev.trim()!=='') out.push('')
    // blank line before list
    if(isList && out.length>0 && prev.trim()!=='' && !/^\s*([-*+]\s|\d+\.\s)/.test(prev)) out.push('')
    // push current line
    out.push(line)
    // blank line after headings
    if(isHeading && (i+1<lines.length) && next.trim()!=='') out.push('')
    // ensure blank lines around fenced code blocks
    if(/^(\s*)```|^(\s*)~~~/.test(line)){
      const beforeIdx = out.length-2
      if(beforeIdx>=0 && out[beforeIdx].trim()!=='') out.splice(out.length-1,0,'')
      // find closing fence
      let j=i+1; while(j<lines.length && !(/^(\s*)```|^(\s*)~~~/.test(lines[j]))) j++
      if(j<lines.length){
        if(j+1<lines.length && lines[j+1].trim()!=='') lines.splice(j+1,0,'')
        i=j
      }
    }
  }
  let result = out.join('\n')
  if(!result.endsWith('\n')) result += '\n'
  if(result!==txt){ fs.writeFileSync(f, result, 'utf8'); changed++ }
}
console.log(`Fixed markdown files: ${changed}`)