// Build re-verification batches over ONLY the files that failed Phase D
// verification and were then fixed (union of verify-fails-{easy,medium,hard}).
// Fresh independent verifiers confirm the fixes actually resolved the defects.
// Batch 4, partitioned by difficulty. Output: reports/reverify-batches/<Diff>-<i>.json
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { ROOT } from './lib.mjs';

const BATCH = 4;
const outDir = join(ROOT, 'reports', 'reverify-batches');
if (existsSync(outDir)) for (const f of readdirSync(outDir)) rmSync(join(outDir, f));
mkdirSync(outDir, { recursive: true });

const diffOf = (rel) => rel.includes('_Easy_') ? 'Easy' : rel.includes('_Medium_') ? 'Medium' : 'Hard';
const files = { Easy: [], Medium: [], Hard: [] };
for (const diff of ['easy', 'medium', 'hard']) {
  const p = join(ROOT, 'reports', `verify-fails-${diff}.json`);
  if (!existsSync(p)) continue;
  for (const entry of JSON.parse(readFileSync(p, 'utf8'))) {
    const rel = entry.file;
    // hasFigure heuristic from source (audit samples may be stale after fixes)
    let hasFigure = false;
    try { hasFigure = /figureCode:\s*`/.test(readFileSync(join(ROOT, rel), 'utf8')); } catch {}
    files[diffOf(rel)].push({ rel, hasFigure });
  }
}

const counts = { Easy: 0, Medium: 0, Hard: 0 };
for (const [diff, list] of Object.entries(files)) {
  for (let i = 0; i < list.length; i += BATCH) {
    const idx = counts[diff]++;
    writeFileSync(join(outDir, `${diff}-${idx}.json`),
      JSON.stringify({ folder: 'mixed', files: list.slice(i, i + BATCH) }, null, 1), 'utf8');
  }
}
writeFileSync(join(ROOT, 'reports', 'reverify-index.json'), JSON.stringify(counts, null, 1), 'utf8');
console.log(JSON.stringify({ totalFixed: Object.values(files).reduce((n, l) => n + l.length, 0), batches: counts }, null, 2));
