import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: e53870b6
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-9, const1: 2-10]
* - Difficulty factors: [Infinite solutions concept]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [k must equal constant]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_e53870b6 = {
  metadata: {
    // id: "e53870b6",
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
      options: null,
      correctAnswer: const1.toString(),
      explanation: `For infinitely many solutions, both sides must be identical. Subtracting $${coeff}x$ gives $k = ${const1}$.`
    };
  }
};

/**
* Question ID: 23758540
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: 100-400, result: 10-50]
* - Difficulty factors: [Two-step equation with larger numbers]
* - Distractor patterns: [A: division error, C: wrong operation, D: ignored coefficient]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
