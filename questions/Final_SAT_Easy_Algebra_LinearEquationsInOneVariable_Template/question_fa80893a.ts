import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: fa80893a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-5, constants: 2-5, 1-15]
* - Difficulty factors: [Multi-step manipulation, solving for expression]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_fa80893a = {
  metadata: {
    // id: "fa80893a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const x = getRandomInt(2, 6);
    const b = getRandomInt(2, 5);
    const c = a * x + b;
    const multiplier = getRandomInt(2, 4);
    const subAmount = getRandomInt(1, 15);
    const targetValue = multiplier * (c - b) - subAmount;
    const leftSide = `${a}x + ${b}`;
    const targetExpr = `${a * multiplier}x - ${subAmount}`;

    return {
      questionText: `If \\( ${leftSide} = ${c} \\), what is the value of \\( ${targetExpr} \\)?`,
      figureCode: null,
      options: null,
      correctAnswer: targetValue.toString(),
      explanation: `The correct answer is ${targetValue}. It's given that \\( ${leftSide} = ${c} \\). Multiplying each side of this equation by ${multiplier} yields \\( ${multiplier}(${leftSide}) = ${multiplier}(${c}) \\), or \\( ${a * multiplier}x + ${multiplier * b} = ${multiplier * c} \\). Subtracting ${subAmount + multiplier * b} from each side of this equation yields \\( ${a * multiplier}x + ${multiplier * b} - (${subAmount + multiplier * b}) = ${multiplier * c} - (${subAmount + multiplier * b}) \\), or \\( ${targetExpr} = ${targetValue} \\). Therefore, the value of \\( ${targetExpr} \\) is ${targetValue}.`
    };
  }
};

/**
* Question ID: 0adbe034
*
* ORIGINAL ANALYSIS:
* - Number ranges: [divisor: 2-5, x: 1-10, constant: 10-50]
* - Difficulty factors: [Dividing all terms to simplify, recognizing equivalent expression]
* - Distractor patterns: [A: original left side value, B/C: calculation errors]
* - Constraints: [Result must be integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
