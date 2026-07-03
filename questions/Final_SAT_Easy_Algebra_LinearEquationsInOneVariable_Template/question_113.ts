import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 113
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, const1: 2-10, result: 20-100]
* - Difficulty factors: [Two-step equation]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_113 = {
  metadata: {
    id: "113",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const const1 = getRandomInt(2, 10);
    const result = getRandomInt(20, 100);
    const rightSide = coeff * result + const1;

    return {
      questionText: `What is the solution to the given equation? $$${coeff}x + ${const1} = ${rightSide}$$`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `Subtract ${const1}: $${coeff}x = ${rightSide - const1}$. Divide by ${coeff}: $x = ${result}$. Check: $${coeff}(${result}) + ${const1} = ${coeff * result} + ${const1} = ${rightSide}$.`
    };
  }
};
