import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 149
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff1: 8-20, coeff2: 1-19, result: 5-15]
* - Difficulty factors: [Collecting like terms with x on both sides]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_149 = {
  metadata: {
    id: "149",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff1 = getRandomInt(8, 20);
    const coeff2 = getRandomInt(1, coeff1 - 1);
    const result = getRandomInt(5, 15);
    const rightSide = (coeff1 + coeff2) * result;

    return {
      questionText: `What value of $x$ is the solution to the given equation? $$${coeff1}x = ${rightSide} - ${coeff2}x$$`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Add ${coeff2}x: ${coeff1 + coeff2}x = ${rightSide}. Divide: x = ${rightSide}/${coeff1 + coeff2} = ${result}.`
    };
  }
};
