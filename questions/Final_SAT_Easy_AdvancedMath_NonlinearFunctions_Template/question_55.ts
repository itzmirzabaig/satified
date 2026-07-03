import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 55
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: 4-8, base: 4-10]
 * - Difficulty factors: [Substituting and evaluating square root functions]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [x must be a perfect square]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_55 = {
  metadata: {
    id: "55",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c = getRandomInt(4, 8);

    const base = getRandomInt(4, 10);

    const x = base * base;

    const result = c + base;

    return {
      questionText: `The function $f$ is defined by $f(x)=${c}+\\sqrt{x}$. What is the value of $f(${x})$?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `$f(${x}) = ${c} + \\sqrt{${x}} = ${c} + ${base} = ${result}$.`
    };
  }
};
