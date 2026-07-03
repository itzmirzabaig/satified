import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 153
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-9, const1: 2-10]
* - Difficulty factors: [Infinite solutions concept]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [k must equal constant]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_153 = {
  metadata: {
    id: "153",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 9);
    const const1 = getRandomInt(2, 10);

    return {
      questionText: `In the equation $${coeff}x + k = ${coeff}x + ${const1}$, $k$ is a constant. If the equation has infinitely many solutions, what is the value of $k$?`,
      figureCode: null,
      options: [],
      correctAnswer: const1.toString(),
      explanation: `For infinitely many solutions, both sides must be identical. Subtracting $${coeff}x$ gives $k = ${const1}$.`
    };
  }
};
