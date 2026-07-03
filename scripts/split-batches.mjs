// Splits reports/fix-batches.json into per-batch manifest files that fix
// agents read individually (reports/batches/<difficulty>-<i>.json), plus a
// compact index per difficulty for workflow args.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

const all = JSON.parse(readFileSync(join(ROOT, 'reports', 'fix-batches.json'), 'utf8'));
mkdirSync(join(ROOT, 'reports', 'batches'), { recursive: true });

const index = {};
for (const [diff, batches] of Object.entries(all)) {
  index[diff] = batches.map((b, i) => {
    writeFileSync(join(ROOT, 'reports', 'batches', `${diff}-${i}.json`), JSON.stringify(b, null, 1), 'utf8');
    return {
      i,
      manifest: `reports/batches/${diff}-${i}.json`,
      ids: b.files.map(f => f.rel.match(/question_(\d+)/)[1]).join(','),
      codes: [...new Set(b.files.flatMap(f => f.hardCodes))].join(','),
    };
  });
}
writeFileSync(join(ROOT, 'reports', 'batch-index.json'), JSON.stringify(index, null, 1), 'utf8');
console.log(Object.fromEntries(Object.entries(index).map(([k, v]) => [k, v.length])));
