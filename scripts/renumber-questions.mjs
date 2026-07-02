// Renames every question file to a global sequential ID: question_1.ts,
// question_2.ts, ... ordered by difficulty (Easy, Medium, Hard), then folder
// name, then old filename. Rewrites generator exports (`generator_<old>` ->
// `generator_<N>`), header comments and metadata ids to match.
//
// Two-phase rename (via temp names) so old/new name collisions are impossible.
// Usage: node scripts/renumber-questions.mjs
import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { ROOT, listQuestionFiles, difficultyRank, parseError } from './lib.mjs';

function main() {
  const files = listQuestionFiles().sort((a, b) => {
    const fa = basename(dirname(a)), fb = basename(dirname(b));
    const d = difficultyRank(fa) - difficultyRank(fb);
    if (d !== 0) return d;
    if (fa !== fb) return fa < fb ? -1 : 1;
    return basename(a) < basename(b) ? -1 : 1;
  });

  // Phase 1: move everything to collision-proof temp names.
  const temps = files.map((f, i) => {
    const tmp = join(dirname(f), `__renum_tmp_${i}.ts`);
    renameSync(f, tmp);
    return tmp;
  });

  // Phase 2: rewrite content and move to final names.
  const stats = { renamed: 0, parseFail: [] };
  const mapping = [];
  temps.forEach((tmp, i) => {
    const n = i + 1;
    let src = readFileSync(tmp, 'utf8');
    src = src.replace(/generator_[A-Za-z0-9_]+/g, `generator_${n}`);
    src = src.replace(/Question ID:\s*[A-Za-z0-9_-]+/g, `Question ${n}`);
    src = src.replace(/(\/\/\s*)?\bid:\s*"[^"]*"/, `id: "${n}"`);
    const finalPath = join(dirname(tmp), `question_${n}.ts`);
    const err = parseError(src);
    if (err) stats.parseFail.push(`${relative(ROOT, finalPath)}: ${err}`);
    writeFileSync(tmp, src, 'utf8');
    renameSync(tmp, finalPath);
    mapping.push({ n, folder: basename(dirname(finalPath)), old: basename(files[i]) });
    stats.renamed++;
  });

  writeFileSync(join(ROOT, 'reports', 'renumber-map.json'), JSON.stringify(mapping, null, 1), 'utf8');
  console.log(JSON.stringify({ renamed: stats.renamed, parseFail: stats.parseFail }, null, 2));
}

main();
