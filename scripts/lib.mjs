// Shared helpers for the question-bank maintenance scripts.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { transformSync } from 'esbuild';

export const ROOT = process.cwd();
export const QUESTIONS_DIR = join(ROOT, 'questions');
export const BACKUP_DIR = join(ROOT, 'backup');

/** All question_*.ts files under a root, as absolute paths, sorted. */
export function listQuestionFiles(root = QUESTIONS_DIR) {
  const out = [];
  for (const folder of readdirSync(root).sort()) {
    const fp = join(root, folder);
    if (!statSync(fp).isDirectory()) {
      if (folder.startsWith('question_') && folder.endsWith('.ts')) out.push(fp);
      continue;
    }
    for (const f of readdirSync(fp).sort()) {
      if (f.startsWith('question_') && f.endsWith('.ts')) out.push(join(fp, f));
    }
  }
  return out;
}

/** Difficulty rank for global ordering: Easy, Medium, Hard, then anything else. */
export function difficultyRank(folderName) {
  if (folderName.includes('_Easy_')) return 0;
  if (folderName.includes('_Medium_')) return 1;
  if (folderName.includes('_Hard_')) return 2;
  return 3;
}

/** Returns null if source parses as TS, else the esbuild error message. */
export function parseError(source) {
  try {
    transformSync(source, { loader: 'ts' });
    return null;
  } catch (e) {
    return (e && e.message) ? e.message.split('\n')[0] : String(e);
  }
}
