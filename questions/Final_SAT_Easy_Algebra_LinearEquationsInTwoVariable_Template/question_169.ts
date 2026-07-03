import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 169
 *
 * ORIGINAL ANALYSIS: [Parallel slope fraction value]
 */

export const generator_169 = {
  metadata: {
    id: "169",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = "1/4";

    return {
      questionText: `Line $k$ is $y = \\frac{1}{4}x + 1$. Line $j$ is parallel. What is the slope of $j$?`,
      figureCode: null,
      options: [],
      correctAnswer: "1/4",
      explanation: `Parallel lines have equal slopes. Since $k$ has slope $1/4$, $j$ does too.`
    };
  }
};
