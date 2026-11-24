import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1106
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = |a - b x|, solve f(k) = c k]
 * - Difficulty factors: [Absolute value equation, extraneous solution check]
 * - Distractor patterns: [A: a/(b+c) correct, B: a/b, C: a/c, D: a]
 * - Constraints: [Must check which solution is valid]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * MATH (re-derived):
 *   f(k) = c k  =>  |a - b k| = c k.  Since c > 0, any valid k satisfies c k >= 0, so k >= 0.
 *   Case 1 (a - b k >= 0):  a - b k = c k  =>  a = (b + c) k  =>  k = a/(b+c)  (always >= 0, valid).
 *   Case 2 (a - b k <  0):  b k - a = c k  =>  (b - c) k = a  =>  k = a/(b-c).
 *   We force b < c, so b - c < 0 and k = a/(b-c) < 0, which fails k >= 0 -> rejected.
 *   Hence there is EXACTLY ONE valid solution, k = a/(b+c).
 *   Distractors {a/b, a/c, a} are always numerically distinct from the answer and from
 *   each other for a in [40,80], 2 <= b < c <= 5 (verified over the full range).
 */

export const generator_1106 = {
  metadata: {
    id: "1106",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(40, 80);
    const b = getRandomInt(2, 4);
    const c = getRandomInt(b + 1, 5); // c > b guarantees a single valid solution

    const den = b + c; // correct denominator

    // Previously fractions were left unreduced (60/5) and the choice "a" was not a real slip.
    // All values are now reduced, and that choice is the rejected root a/(b-c) from the second case.
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const fracTex = (num: number, denom: number) => {
      const g = gcd(Math.abs(num), Math.abs(denom));
      const sign = num * denom < 0 ? '-' : '';
      const n = Math.abs(num) / g;
      const d = Math.abs(denom) / g;
      return d === 1 ? `${sign}${n}` : `${sign}\\frac{${n}}{${d}}`;
    };
    const correctTex = fracTex(a, den);
    const zeroTex = fracTex(a, b);
    const droppedTex = fracTex(a, c);
    const rejectedTex = fracTex(a, b - c);

    const optionsData = [
      { text: `$${correctTex}$`, isCorrect: true, reason: '' },
      { text: `$${zeroTex}$`, isCorrect: false, reason: `$${zeroTex}$ makes the expression inside the absolute value equal to 0, so it solves $f(k)=0$ rather than $f(k)=${c}k$` },
      { text: `$${droppedTex}$`, isCorrect: false, reason: `$${droppedTex}$ solves $${a}=${c}k$, which leaves out the term $-${b}k$ inside the absolute value` },
      { text: `$${rejectedTex}$`, isCorrect: false, reason: `$${rejectedTex}$ is the solution of the second case, but it is negative, so $${c}k$ would be negative and could not equal an absolute value` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x)=|${a}-${b}x|$. Which of the following is a value of $k$ for which $f(k)=${c}k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${correctTex}$`,
      explanation: `Choice ${correctLetter} is correct. An absolute value is never negative, so $${c}k \\ge 0$, which means $k \\ge 0$. The equation $|${a}-${b}k|=${c}k$ splits into two cases. In the first case, $${a}-${b}k=${c}k$, so $${a}=${den}k$ and $k=${correctTex}$. In the second case, $${b}k-${a}=${c}k$, so $${b - c === -1 ? '-' : `${b - c}`}k=${a}$ and $k=${rejectedTex}$, which is negative and is rejected. Therefore $k=${correctTex}$ is the only valid value. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
