import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 121
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: 1-5, rightSide: 10-30, multiplier: 2-4]
* - Difficulty factors: [Expression scaling by 3]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_121 = {
  metadata: {
    id: "121",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 5);
    const const1 = getRandomInt(1, 5);
    const rightSide = getRandomInt(10, 30);
    const multiplier = getRandomInt(2, 4);
    const result = multiplier * rightSide;

    return {
      questionText: `If $${coeff}x + ${const1} = ${rightSide}$, what is the value of $${multiplier * coeff}x + ${multiplier * const1}$?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `The expression $${multiplier * coeff}x + ${multiplier * const1}$ is equivalent to $${multiplier}(${coeff}x + ${const1})$. Multiplying both sides of the given equation by ${multiplier} gives $${multiplier}(${coeff}x + ${const1}) = ${multiplier}(${rightSide})$, which is equivalent to $${multiplier * coeff}x + ${multiplier * const1} = ${result}$. Therefore, the value of $${multiplier * coeff}x + ${multiplier * const1}$ is ${result}.`
    };
  }
};
