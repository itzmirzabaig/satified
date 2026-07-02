import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 127
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, const1: 10-30]
* - Difficulty factors: [Infinitely many solutions concept]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [k must equal constant for infinite solutions]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_127 = {
  metadata: {
    id: "127",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);
    const const1 = getRandomInt(10, 30);

    return {
      questionText: `In the equation $${coeff}x + ${const1} = ${coeff}x + k$, $k$ is a constant. The equation has infinitely many solutions. What is the value of $k$?`,
      figureCode: null,
      options: null,
      correctAnswer: const1.toString(),
      explanation: `For infinitely many solutions, both sides must be identical. Subtracting $${coeff}x$ from both sides yields $k = ${const1}$. Therefore, $k = ${const1}$.`
    };
  }
};
