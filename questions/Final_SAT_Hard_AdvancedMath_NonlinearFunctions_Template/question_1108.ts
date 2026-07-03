import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1108
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = x^2 - 2b x + c, large numbers suggest completing the square]
 * - Difficulty factors: [Completing the square, vertex form, minimum value]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must complete square cleanly to get integer minimum]
 * - Question type: [Fill-in-the-blank quadratic minimum]
 * - Figure generation: [None]
 *
 * MATH (re-derived):
 *   f(x) = x^2 - 2b x + c = (x - b)^2 - b^2 + c = (x - b)^2 + (c - b^2).
 *   Since (x - b)^2 >= 0, the minimum value is c - b^2, attained at x = b.
 *   Construct answer-first: pick minValue, set c = b^2 + minValue, so minimum = minValue (integer).
 */

export const generator_1108 = {
  metadata: {
    id: "1108",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const b = getRandomInt(15, 30);
    const minValue = getRandomInt(1000, 2500);
    const c = b * b + minValue;

    return {
      questionText: `The function is defined by $f(x) = x^2 - ${2 * b}x + ${c}$. What is the minimum value of the given function?`,
      figureCode: null,
      options: [],
      correctAnswer: minValue.toString(),
      explanation: `Completing the square: $f(x) = x^2 - ${2 * b}x + ${c} = (x-${b})^2 - ${b * b} + ${c} = (x-${b})^2 + ${minValue}$. Since $(x-${b})^2 \\geq 0$, the smallest possible value of $f(x)$ is ${minValue}, which occurs when $x = ${b}$. So the minimum value is ${minValue}.`
    };
  }
};
