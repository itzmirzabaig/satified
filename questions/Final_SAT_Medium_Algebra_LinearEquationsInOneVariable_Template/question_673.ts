import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 673
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 1, 4, constants: -10, 40]
 * - Difficulty factors: [Solving for expression bt rather than t]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Target expression bt appears naturally in solution]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_673 = {
  metadata: {
    id: "673",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Equation form: a(bt - c) + t = d + e t, solve for the expression b t.
    //   a b t - a c + t = d + e t
    //   (a b + 1 - e) t = d + a c
    //   t = (d + a c) / (a b + 1 - e),   answer = b t
    //
    // Answer-first construction so the answer for b t is always an exact
    // positive integer and the printed equation is exactly consistent.
    let a = 0, b = 0, c = 0, d = 0, e = 0, t = 0, k = 0;
    let tries = 0;
    do {
      a = getRandomInt(2, 4);
      b = getRandomInt(2, 5);
      c = getRandomInt(3, 12);
      t = getRandomInt(2, 8);            // chosen solution for t (integer)
      // k = a*b + 1 - e must be a positive integer >= 2; pick e accordingly.
      // a*b ranges 4..20, so a*b + 1 ranges 5..21; keep e so k in [2, ...].
      const kMax = a * b + 1 - 2;        // e minimum is 2 -> k maximum
      k = getRandomInt(2, Math.min(6, kMax));
      e = a * b + 1 - k;                 // in [2, a*b - 1], always >= 2
      d = k * t - a * c;                 // forced so equation is consistent
      tries++;
    } while ((d < 8 || d > 80 || e < 2) && tries < 50);

    // Fallback (extremely unlikely) to a hand-checked clean instance.
    if (d < 8 || d > 80 || e < 2) {
      a = 2; b = 3; c = 5; t = 4; k = 3; e = a * b + 1 - k; d = k * t - a * c;
    }

    const answer = b * t;                // exact integer value of b t

    return {
      questionText: `If $${a}(${b}t - ${c}) + t = ${d} + ${e}t$, what is the value of $${b}t$?`,
      figureCode: null,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `Distributing on the left-hand side gives $${a * b}t - ${a * c} + t = ${d} + ${e}t$. Combining like terms yields $${a * b + 1}t - ${a * c} = ${d} + ${e}t$. Subtracting $${e}t$ from both sides and adding $${a * c}$ to both sides yields $${k}t = ${d + a * c}$. Dividing both sides by $${k}$ gives $${t} = t$. Therefore $${b}t = ${b} \\times ${t} = ${answer}$.`
    };
  }
};
