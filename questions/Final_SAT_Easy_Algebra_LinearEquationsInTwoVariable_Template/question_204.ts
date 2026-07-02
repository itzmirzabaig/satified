import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 204
 *
 * ORIGINAL ANALYSIS: [Y-intercept by substitution]
 */

export const generator_204 = {
  metadata: {
    id: "204",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 15);
    const b = getRandomInt(2, 5);
    const c = b * getRandomInt(5, 15);
    const yVal = c / b;

    return {
      questionText: `The y-intercept of $${a}x + ${b}y = ${c}$ is $(0, y)$. What is $y$?`,
      figureCode: null,
      options: null,
      correctAnswer: yVal.toString(),
      explanation: `Set $x=0$ to find $${b}y = ${c}$, so $y = ${yVal}$.`
    };
  }
};
