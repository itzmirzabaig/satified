import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 87071893
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 20-60, result: 30-80]
* - Difficulty factors: [Simple subtraction]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_87071893 = {
  metadata: {
    // id: "87071893",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(20, 60);
    const result = getRandomInt(30, 80);
    const rightSide = result + addend;

    return {
      questionText: `What value of $x$ is the solution to the equation $x + ${addend} = ${rightSide}$?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Subtract ${addend}: x = ${rightSide} - ${addend} = ${result}.`
    };
  }
};

/**
* Question ID: b4553284
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, rightSide: 10-75, multiplier: 3-6]
* - Difficulty factors: [Solve for expression, scaling]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
