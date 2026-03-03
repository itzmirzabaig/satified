import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: c7d7980e
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff1: 8-20, coeff2: 1-19, result: 5-15]
* - Difficulty factors: [Collecting like terms with x on both sides]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_c7d7980e = {
  metadata: {
    // id: "c7d7980e",
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

/**
* Question ID: 83fb222d
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, result: 2-8, addend: 2-8]
* - Difficulty factors: [Solve and substitute]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
