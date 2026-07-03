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

    const optionsData = [
      { text: `$\\frac{${a}}{${den}}$`, isCorrect: true },  // k = a/(b+c)
      { text: `$\\frac{${a}}{${b}}$`, isCorrect: false },   // solved a - b k = 0
      { text: `$\\frac{${a}}{${c}}$`, isCorrect: false },   // divided by c only
      { text: `$${a}$`, isCorrect: false }                  // ignored coefficients
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The function $f$ is defined by $f(x)=|${a}-${b}x|$. Which of the following is a value of $k$ for which $f(k)=${c}k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$\\frac{${a}}{${den}}$`,
      explanation: `Choice ${correctLetter} is correct. Since the right-hand side cannot be negative, any solution has $k \\ge 0$. Writing $f(k)=|${a}-${b}k|$, the equation $f(k)=${c}k$ splits into two cases. When $|${a}-${b}k|=${a}-${b}k$, we get $k=\\frac{${a}}{${b}+${c}}=\\frac{${a}}{${den}}$. The other case leads to $k=\\frac{${a}}{${b}-${c}}$, which is negative and is rejected. Therefore $k=\\frac{${a}}{${den}}$ is the only valid value.`
    };
  }
};
