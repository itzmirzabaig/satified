import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

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

export const generator_83fb222d = {
  metadata: {
    // id: "83fb222d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const result = getRandomInt(2, 8);
    const rightSide = coeff * result;
    const addend = getRandomInt(2, 8);

    return {
      questionText: `If $${coeff}n = ${rightSide}$, what is the value of $n + ${addend}$?`,
      figureCode: null,
      options: null,
      correctAnswer: (result + addend).toString(),
      explanation: `n = ${rightSide}/${coeff} = ${result}, so n + ${addend} = ${result} + ${addend} = ${result + addend}.`
    };
  }
};

/**
* Question ID: 7a987ae4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 20-180, subtract: 1-5]
* - Difficulty factors: [Expression evaluation with scaling]
* - Distractor patterns: [A: n-1, C: 2n value, D: 4n-1]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
