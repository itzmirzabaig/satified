import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 159
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-5, constants: 2-5, 1-15]
* - Difficulty factors: [Multi-step manipulation, solving for expression]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_159 = {
  metadata: {
    id: "159",
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
