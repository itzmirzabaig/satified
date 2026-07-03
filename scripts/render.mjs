// Prints N seeded rendered draws of a question as JSON — exactly what the
// student-facing app receives. Verifier agents use this to solve questions
// from the rendered text/figure alone.
//   npx tsx scripts/render.mjs <question file> [count=3]
// Draw i uses the same seed as the audit harness (fileId:i), so draws are
// identical across audit, fixer and verifier runs.
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { fnv1a, mulberry32 } from './checks.mjs';

const file = process.argv[2];
const count = Number(process.argv[3] || 3);
if (!file) { console.error('usage: npx tsx scripts/render.mjs <file> [count]'); process.exit(2); }

const abs = resolve(file);
const fileId = basename(abs, '.ts');
const mod = await import(pathToFileURL(abs).href);
const key = Object.keys(mod).find(k => k.startsWith('generator_'));
if (!key) { console.error('no generator export found'); process.exit(1); }

const real = Math.random;
try {
  for (let i = 0; i < count; i++) {
    Math.random = mulberry32(fnv1a(`${fileId}:${i}`));
    const d = mod[key].generate();
    console.log(`──── draw ${i} ────`);
    console.log(JSON.stringify(d, null, 1));
  }
} finally {
  Math.random = real;
}
