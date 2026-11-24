import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1134
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = (x+5)(x-6)(x-7), find c in standard form]
 * - Difficulty factors: [Cubic expansion, constant term identification]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [c = (5)(-6)(-7) = 210, the product of the constant terms]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 *
 * FIXED: the stem never said what h, a, b and c were, and the explanation did
 * not say why c is the product of the constants. The two positive roots are now
 * distinct so the factors never repeat.
 */

export const generator_1134 = {
  metadata: {
    id: "1134",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const r1 = -getRandomInt(3, 8);
    const r2 = getRandomInt(4, 10);
    let r3 = getRandomInt(4, 10);
    while (r3 === r2) r3 = getRandomInt(4, 10);

    const c = -r1 * r2 * r3;

    const factor1 = r1 >= 0 ? `(x-${r1})` : `(x+${Math.abs(r1)})`;
    const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
    const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;

    return {
      questionText: `The function $h$ is defined by $h(x)=${factor1}${factor2}${factor3}$. When $h(x)$ is written in the form $x^3+ax^2+bx+c$, where $a$, $b$, and $c$ are constants, what is the value of $c$?`,
      figureCode: null,
      options: [],
      correctAnswer: c.toString(),
      explanation: `The correct answer is ${c}. When the three factors are multiplied, the only term without $x$ comes from multiplying the constant term of each factor. The constant terms are $${-r1}$, $${-r2}$, and $${-r3}$, so $c=(${-r1})(${-r2})(${-r3})=${c}$.`
    };
  }
};
