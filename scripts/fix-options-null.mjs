// Fix agents used `options: null` for fill-in questions; the type is
// (string|{text})[]. At runtime `!d.options` handles null identically to [],
// but tsc flags 296 TS2322s. `options: []` is semantically correct for a
// fill-in and type-clean. Replace only the exact property assignment, and
// only when the file still parses afterward.
//   node scripts/fix-options-null.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { relative } from 'node:path';
import { ROOT, listQuestionFiles, parseError } from './lib.mjs';

let changed = 0;
const skipped = [];
for (const file of listQuestionFiles()) {
  const src = readFileSync(file, 'utf8');
  if (!/\boptions:\s*null\b/.test(src)) continue;
  const next = src.replace(/\boptions:\s*null\b/g, 'options: []');
  const err = parseError(next);
  if (err) { skipped.push(`${relative(ROOT, file)}: ${err}`); continue; }
  writeFileSync(file, next, 'utf8');
  changed++;
}
console.log(JSON.stringify({ changed, skipped }, null, 2));
