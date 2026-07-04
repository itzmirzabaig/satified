// Consolidates Phase D verifier FAILs (reports/verify-fails-{easy,medium,hard}.json)
// into fix batches. Each failed file carries the verifier's failure evidence +
// counterexample so the fix agent can reproduce and fix the exact defect.
// Batch size 2 (these are hard cases: real wrong answers, figure rebuilds,
// under-specified questions). Partitioned by difficulty for resumable runs.
// Output: reports/verifyfix-batches/<Diff>-<i>.json + reports/verifyfix-index.json
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

const BATCH = 2;
const outDir = join(ROOT, 'reports', 'verifyfix-batches');
if (existsSync(outDir)) for (const f of readdirSync(outDir)) rmSync(join(outDir, f));
mkdirSync(outDir, { recursive: true });

const diffOf = (rel) => rel.includes('_Easy_') ? 'Easy' : rel.includes('_Medium_') ? 'Medium' : 'Hard';
const counts = { Easy: 0, Medium: 0, Hard: 0 };
const buckets = { Easy: [], Medium: [], Hard: [] };

for (const diff of ['easy', 'medium', 'hard']) {
  const p = join(ROOT, 'reports', `verify-fails-${diff}.json`);
  if (!existsSync(p)) { console.error(`WARN missing ${p}`); continue; }
  for (const entry of JSON.parse(readFileSync(p, 'utf8'))) {
    buckets[diffOf(entry.file)].push(entry);
  }
}

const index = {};
for (const [diff, entries] of Object.entries(buckets)) {
  index[diff] = [];
  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = { files: entries.slice(i, i + BATCH) };
    const idx = counts[diff]++;
    writeFileSync(join(outDir, `${diff}-${idx}.json`), JSON.stringify(batch, null, 1), 'utf8');
    index[diff].push(idx);
  }
}

writeFileSync(join(ROOT, 'reports', 'verifyfix-index.json'), JSON.stringify(counts, null, 1), 'utf8');
console.log(JSON.stringify({
  totalFailFiles: Object.values(buckets).reduce((n, b) => n + b.length, 0),
  batches: counts,
}, null, 2));
