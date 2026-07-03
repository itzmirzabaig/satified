import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1185
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Logic: For a*x + b*y = c, the x-intercept is (c/a, 0) and the y-intercept
 *   is (0, c/b). Naming the x-intercept (r, 0) and y-intercept (0, t):
 *     r = c/a,  t = c/b,  so  t/r = (c/b)/(c/a) = a/b.
 *   The requested ratio t/r therefore equals a/b (independent of c).
 * - Correct answer: a/b, simplified.
 * - Distractors: -a/b (spurious sign), b/a (inverted ratio), -b/a (inverted
 *   with spurious sign). All simplified so they read in parallel.
 * - Guards: b != a keeps all four values numerically distinct (the only way
 *   two of {a/b, -a/b, b/a, -b/a} collide is a == b, which gives ±1 twice).
 *   Intercepts are shown as fractions, never decimals, so no float artifacts.
 */

export const generator_1185 = {
  metadata: {
    id: "1185",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Random coefficients. a != b so the four ratio options never collide.
    const a = getRandomInt(2, 10);
    let b = getRandomInt(2, 10);
    let guard = 0;
    while (b === a && guard++ < 50) {
      b = getRandomInt(2, 10);
    }
    if (b === a) b = a === 2 ? 3 : a - 1; // deterministic fallback (never loops forever)

    const c = -getRandomInt(20, 50); // negative constant -> negative intercepts

    // STEP 2: Simplify a fraction p/q to lowest terms, returning a TeX string.
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, Math.abs(x % y)));
    const fracTeX = (p: number, q: number): string => {
      const sign = (p < 0) !== (q < 0) ? "-" : "";
      const P = Math.abs(p);
      const Q = Math.abs(q);
      const g = gcd(P, Q) || 1;
      const n = P / g;
      const d = Q / g;
      return d === 1 ? `${sign}${n}` : `${sign}\\frac{${n}}{${d}}`;
    };

    // STEP 3: Build the four option TeX strings.
    const correctTeX = fracTeX(a, b);   // a/b  (the requested ratio t/r)
    const negAB = fracTeX(-a, b);        // -a/b
    const invBA = fracTeX(b, a);         // b/a
    const negBA = fracTeX(-b, a);        // -b/a

    const optionsData = [
      { text: `$${correctTeX}$`, isCorrect: true, reason: "" },
      { text: `$${negAB}$`, isCorrect: false, reason: "keeps an extra negative sign on the ratio" },
      { text: `$${invBA}$`, isCorrect: false, reason: "inverts the ratio, computing $r/t$ instead of $t/r$" },
      { text: `$${negBA}$`, isCorrect: false, reason: "both inverts the ratio and adds an extra negative sign" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Intercepts as simplified fractions (never decimals).
    const rTeX = fracTeX(c, a); // x-intercept value c/a
    const tTeX = fracTeX(c, b); // y-intercept value c/b

    // Show the reduced form only when a/b is not already in lowest terms,
    // so the final line doesn't read "= 2/9 = 2/9".
    const rawAB = `\\frac{${a}}{${b}}`;
    const finalStep = correctTeX === rawAB ? rawAB : `${rawAB} = ${correctTeX}`;

    return {
      questionText: `The graph of $${a}x + ${b}y = ${c}$ in the $xy$-plane has an $x$-intercept at $(r, 0)$ and a $y$-intercept at $(0, t)$, where $r$ and $t$ are constants. What is the value of $\\frac{t}{r}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. To find the $x$-intercept, substitute $y = 0$: $${a}x = ${c}$, so $r = ${rTeX}$. To find the $y$-intercept, substitute $x = 0$: $${b}y = ${c}$, so $t = ${tTeX}$. The requested ratio is $\\frac{t}{r} = \\frac{c/${b}}{c/${a}}$, where $c = ${c}$. The factor $c$ cancels, leaving $\\frac{t}{r} = ${finalStep}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
