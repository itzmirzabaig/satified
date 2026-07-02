import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 52
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 10-50]
 * - Difficulty factors: [Calculating y-intercept of a basic quadratic]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Quadratic in form y = x^2 + k]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_52 = {
  metadata: {
    id: "52",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const k = getRandomInt(10, 50);

    return {
      questionText: `The $y$-intercept of the graph of $y=x^2+${k}$ in the xy-plane is $(0, y)$. What is the value of $y$?`,
      figureCode: null,
      options: null,
      correctAnswer: k.toString(),
      explanation: `The y-intercept is the point on the graph where $x=0$. Substituting 0 for $x$ in $y = x^2 + ${k}$ gives $y = 0^2 + ${k} = ${k}$.`
    };
  }
};
