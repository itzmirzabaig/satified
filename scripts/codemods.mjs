// One-shot, idempotent source cleanups over questions/**.ts:
//   1. Merge duplicate `import {...} from 'x'` lines (same specifier).
//   2. Rewrite `from '../../types'` -> `from '../../study/types'` (tsc can't
//      resolve the former; only a vite alias kept it working at runtime).
//   3. Strip orphaned trailing comment stubs ("Question ID: ..." blocks with
//      no code after the final generator).
// Every transformed file must still parse (esbuild); otherwise it is skipped.
//
// Usage: node scripts/codemods.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { relative } from 'node:path';
import { ROOT, listQuestionFiles, parseError } from './lib.mjs';

function mergeDuplicateImports(src) {
  const lines = src.split('\n');
  const groups = new Map(); // key: `${type?'t':'v'}|${spec}` -> {first: idx, names: Set}
  const importRe = /^import\s+(type\s+)?\{([^}]*)\}\s+from\s+(['"])([^'"]+)\3;?\s*$/;
  const toRemove = new Set();
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    const m = lines[i].match(importRe);
    if (!m) continue;
    const key = `${m[1] ? 't' : 'v'}|${m[4]}`;
    const names = m[2].split(',').map(s => s.trim()).filter(Boolean);
    if (!groups.has(key)) {
      groups.set(key, { first: i, names: new Set(names), type: !!m[1], spec: m[4] });
    } else {
      const g = groups.get(key);
      names.forEach(n => g.names.add(n));
      toRemove.add(i);
    }
  }
  if (toRemove.size === 0) return { src, changed: false };
  for (const g of groups.values()) {
    lines[g.first] = `import ${g.type ? 'type ' : ''}{ ${[...g.names].join(', ')} } from '${g.spec}';`;
  }
  const merged = lines.filter((_, i) => !toRemove.has(i)).join('\n');
  return { src: merged, changed: true };
}

function rewriteTypesImport(src) {
  const next = src
    .replaceAll("from '../../types'", "from '../../study/types'")
    .replaceAll('from "../../types"', "from '../../study/types'");
  return { src: next, changed: next !== src };
}

function stripOrphanStubs(src) {
  const lastGen = src.lastIndexOf('};');
  if (lastGen === -1) return { src, changed: false };
  const tail = src.slice(lastGen + 2);
  if (!/Question ID:|ORIGINAL ANALYSIS/.test(tail)) return { src, changed: false };
  const nonComment = tail.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  if (nonComment.trim() !== '') return { src, changed: false }; // real code after — leave for agents
  return { src: src.slice(0, lastGen + 2) + '\n', changed: true };
}

function main() {
  const stats = { files: 0, imports: 0, paths: 0, stubs: 0, parseSkipped: [] };
  for (const file of listQuestionFiles()) {
    const original = readFileSync(file, 'utf8');
    if (parseError(original)) { stats.parseSkipped.push(relative(ROOT, file)); continue; }
    let cur = original, any = false;

    let r = mergeDuplicateImports(cur);
    if (r.changed) { cur = r.src; stats.imports++; any = true; }
    r = rewriteTypesImport(cur);
    if (r.changed) { cur = r.src; stats.paths++; any = true; }
    r = stripOrphanStubs(cur);
    if (r.changed) { cur = r.src; stats.stubs++; any = true; }

    if (!any) continue;
    const err = parseError(cur);
    if (err) { stats.parseSkipped.push(`${relative(ROOT, file)} (POST: ${err})`); continue; }
    writeFileSync(file, cur, 'utf8');
    stats.files++;
  }
  console.log(JSON.stringify(stats, null, 2));
}

main();
