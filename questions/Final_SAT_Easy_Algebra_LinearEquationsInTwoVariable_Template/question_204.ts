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
      questionText: `The graph of $${a}x + ${b}y = ${c}$ in the $xy$-plane has a $y$-intercept at $(0, b)$. What is the value of $b$?`,
      figureCode: null,
      options: [],
      correctAnswer: yVal.toString(),
      explanation: `The $y$-intercept of a graph is the point where $x = 0$. Substituting 0 for $x$ in the given equation yields $${a}(0) + ${b}y = ${c}$, or $${b}y = ${c}$. Dividing both sides by ${b} yields $y = ${yVal}$. So the $y$-intercept is $(0, ${yVal})$, and the value of $b$ is ${yVal}.`
    };
  }
};
