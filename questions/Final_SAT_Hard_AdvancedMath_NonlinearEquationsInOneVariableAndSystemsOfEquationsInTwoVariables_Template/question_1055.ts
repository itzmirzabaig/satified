import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1055
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation with factoring, sum of solutions]
 * - Difficulty factors: [Factor out common term, zero product property, sum solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must factor correctly, find all solutions, sum them]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1055 = {
  metadata: {
    id: "1055",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: a(x-b)(x+n) = d(x+n) with n > 0
    //   →  (x+n)[a(x-b) - d] = 0
    //   →  x = -n  or  x = (ab+d)/a.
    // The two solutions can never coincide (-n < 0 < (ab+d)/a), so the sum is
    // always well defined: -n + (ab+d)/a.
    // a is restricted to {2, 4, 5} so that when (ab+d)/a is not an integer its
    // reduced denominator is 2, 4, or 5 — i.e. the answer also has an exact
    // short decimal form.
    const a = getRandomElement([2, 4, 5]);
    const b = getRandomInt(10, 20);
    const n = getRandomInt(3, 10); // the shared root is x = -n
    const d = getRandomInt(3, 8);

    const gcd = (m: number, r: number): number => (r === 0 ? m : gcd(r, m % r));
    const g = gcd(a * b + d, a);
    const num = (a * b + d) / g; // reduced numerator of the second solution
    const den = a / g;           // reduced denominator: 1, 2, 4, or 5

    // Sum of solutions: -n + num/den = (num - n*den)/den.
    // gcd(num, den) = 1 implies gcd(num - n*den, den) = 1, so this is reduced.
    let sumDisplay: string; // fill-in answer ("28" or "21/2")
    let sumTex: string;     // same value for the explanation
    let sol2Tex: string;    // second solution for the explanation
    if (den === 1) {
      const sum = num - n;
      sumDisplay = `${sum}`;
      sumTex = `${sum}`;
      sol2Tex = `${num}`;
    } else {
      const sumNum = num - n * den;
      sumDisplay = `${sumNum}/${den}`;
      sumTex = `\\frac{${sumNum}}{${den}}`;
      sol2Tex = `\\frac{${num}}{${den}}`;
    }

    // Show the unreduced quadratic-side value first, then the reduced form if
    // it differs.
    const sol2Step = g === 1
      ? `$x=\\frac{${a * b + d}}{${a}}$`
      : `$x=\\frac{${a * b + d}}{${a}}=${sol2Tex}$`;

    const fractionNote = den === 1 ? `` : `\n\n(The answer may be entered as a fraction or as a decimal.)`;

    const explanation = `The correct answer is $\\,${sumTex}$. Subtracting $\\,${d}(x+${n})$ from both sides of the given equation gives $\\,${a}(x-${b})(x+${n})-${d}(x+${n})=0$. Factoring out the common factor $(x+${n})$ gives $(x+${n})\\left[${a}(x-${b})-${d}\\right]=0$. By the zero product property, either $x+${n}=0$ or $\\,${a}(x-${b})-${d}=0$. The first equation gives $x=-${n}$. Distributing in the second equation gives $\\,${a}x-${a * b}-${d}=0$, so $\\,${a}x=${a * b + d}$ and ${sol2Step}. Therefore, the sum of the solutions is $-${n}+${sol2Tex}=${sumTex}$.`;

    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$${a}(x-${b})(x+${n})=${d}(x+${n})$${fractionNote}`,
      figureCode: null,
      options: [],
      correctAnswer: sumDisplay,
      explanation: explanation
    };
  }
};
