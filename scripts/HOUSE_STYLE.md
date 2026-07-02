# Question generator house style & contract

Every file `questions/<Folder>/question_<N>.ts` exports exactly one
`generator_<N>` object: `{ metadata, generate(): QuestionData }`.
`generate()` is called fresh for every render/regeneration — all randomness
must produce a **valid, self-consistent question for every possible draw**.

```ts
import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
```
Available helpers (utils/math.ts): `getRandomInt(min,max)`, `getRandomNonZeroInt(min,max)`,
`getRandomElement(arr)`, `shuffle(arr)`, `round(num, decimals)`, `isPerfectSquare(n)`, `getFactors(n)`.

## QuestionData contract (study/types.ts)

- `questionText: string` — MathJax inline math in `$...$`. Currency ALWAYS as `\\$` (escaped), never bare `$`.
- `options` — exactly **4** for multiple choice, or `[]`/omitted for fill-in. Strings or `{text}` objects both fine.
- `correctAnswer` — for MC: string that **exactly equals one option's text** (or a numeric index). For fill-in: plain number string (`"12"`, `"-3.5"`) or fraction (`"3/4"`) — never units, `%`, `$`, LaTeX or prose, because students type the answer.
- `figureCode` — `null`, OR a self-contained `<div>...<svg>...</svg></div>` HTML string, OR Mafs JSX. Prefer plain SVG template literals (see below).
- `explanation` — must be **computed from the same live variables as the answer**, reference the correct choice letter, and explain each distractor.

## Hard rules (the smoke gate enforces most of these)

1. **Choice letters are only known after shuffling.** Compute them from the
   shuffled array (`shuffledOptions.find(o => o.isCorrect).letter`), never
   hardcode "Choice A is correct".
2. **Distractors must never collide** with the correct answer (or each other)
   for ANY draw. Guard with bounded retries (≤50) or construct them to differ
   (e.g. `correct + getRandomInt(1,3)`).
3. **No float artifacts.** If a computation can produce `4.333333333333333`,
   constrain the inputs so results are integers/clean decimals (e.g. pick the
   answer first, derive the inputs), or `round(x, 2)` consistently in BOTH
   the answer and the explanation.
4. **Retry loops must be bounded** (`while (bad && tries++ < 50)`) — an
   unlucky range must never hang the render.
5. **No personal names.** Word problems use a generic role introduced once
   ("a student", "a customer", "a biologist"), pronouns after ("she", "he",
   "they" — pick one and stay consistent within the question).
6. **LaTeX hygiene**: balanced `$...$`, balanced `{}`, no `\\\\` runs before
   words, no stray `/` or `\` in prose. Fractions as `\\frac{a}{b}` with LIVE
   values — never a hardcoded denominator when the variable is random.
7. **Figures**: build plain SVG strings in a template literal with normal
   `${...}` interpolation (house exemplar:
   `questions/Final_SAT_Easy_ProblemSolvingAndDataAnalysis_TwoVariableDataModelsAndScatterplots_Template/question_515.ts`
   — compact `viewBox` ≈ 450×250, axis labels, `currentColor` strokes, blue
   `#3b82f6` data points). NEVER nest IIFEs that reference out-of-scope
   variables. Figure values must MATCH the question's numbers for every draw.
8. **Fill-in answers** must survive the grader's normalization (trim,
   lowercase, strip trailing zeros, numeric equivalence incl. `a/b`). If the
   natural answer is a fraction, the question text must say "enter as a
   fraction or decimal".

## Validation gate (mandatory before you finish a file)

```
npx tsx scripts/smoke.mjs questions/<Folder>/question_<N>.ts
```
Exit 0 required. It runs 25 seeded draws and checks: import/generate success,
answer-option match, duplicate options, 4-option count, explanation letter
consistency, NaN/undefined/`${`-leftovers, float artifacts, TeX balance,
figure sanity, personal names, fill-in answer format.
