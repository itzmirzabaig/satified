import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: c13016f9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: 50-80, x: 2]
 * - Difficulty factors: [Substitution and evaluation of a quadratic function]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Evaluation results in integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_c13016f9 = {
  metadata: {
    // id: "c13016f9",
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

/**
 * Question ID: 2d394c28
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 15000-25000, step: 2000-5000]
 * - Difficulty factors: [Interpreting the y-intercept of a linear model in a table]
 * - Distractor patterns: [Origin, max value in table, intermediate value]
 * - Constraints: [x=0 represents the start year]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

