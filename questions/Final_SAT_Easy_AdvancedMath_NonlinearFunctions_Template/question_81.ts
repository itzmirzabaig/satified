import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 81
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [num: 6-10, den: 4-6, const: 2-4, x: 2]
 * - Difficulty factors: [Evaluating a complex rational expression at a point]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Result must be a simplified fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_81 = {
  metadata: {
    id: "81",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const num = getRandomInt(6, 10);

    const den = getRandomInt(4, 6);

    const xInput = 2;

    const constantVal = getRandomInt(2, 4);

    const totalDenom = den * xInput + constantVal;

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    const common = gcd(num, totalDenom);

    const numSimple = num / common;

    const denSimple = totalDenom / common;

    return {
      questionText: `The function $h$ is defined by $h(x)=\\frac{${num}}{${den}x+${constantVal}}$. What is the value of $h(${xInput})$?`,
      figureCode: null,
      options: [],
      correctAnswer: `${numSimple}/${denSimple}`,
      explanation: `$h(${xInput}) = \\frac{${num}}{${den}(${xInput}) + ${constantVal}} = \\frac{${num}}{${totalDenom}}$. Simplified, this is $\\frac{${numSimple}}{${denSimple}}$.`
    };
  }
};
