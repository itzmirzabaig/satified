import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 56e1b09e
*
* ORIGINAL ANALYSIS:
* - Number ranges: [decimals: 1.0-4.0]
* - Difficulty factors: [Decimal subtraction]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Decimal result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_56e1b09e = {
  metadata: {
    // id: "56e1b09e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = parseFloat((Math.random() * 3 + 1).toFixed(1));
    const result = parseFloat((Math.random() * 2 + 0.5).toFixed(1));
    const rightSide = parseFloat((addend + result).toFixed(1));

    return {
      questionText: `What value of $x$ is the solution to the given equation $${addend} + x = ${rightSide}$?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Subtract ${addend}: x = ${rightSide} - ${addend} = ${result}.`
    };
  }
};

/**
* Question ID: 4f8bd093
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff1: 10-25, coeff2: 11-35, const1: 10-40]
* - Difficulty factors: [Variables on both sides]
* - Distractor patterns: [A: sign error, B/C: wrong fraction]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
