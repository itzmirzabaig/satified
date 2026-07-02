import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 88
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: 50-80, x: 2]
 * - Difficulty factors: [Substitution and evaluation of a quadratic function]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Evaluation results in integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_88 = {
  metadata: {
    id: "88",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c = getRandomInt(50, 80);

    const x = 2;

    const result = (x * x) + x + c;

    return {
      questionText: `The function $f$ is defined by $f(x) = x^2 + x + ${c}$. What is the value of $f(${x})$?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Substitute $x=${x}$ into the function: $f(${x}) = (${x})^2 + ${x} + ${c} = 4 + 2 + ${c} = ${result}$.`
    };
  }
};
