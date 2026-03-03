import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 997bec28
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side: 15-35, base: 10-30]
* - Difficulty factors: [Geometric context, perimeter formula]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Triangle inequality satisfied]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_997bec28 = {
  metadata: {
    // id: "997bec28",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const side = getRandomInt(15, 35);
    const base = getRandomInt(10, 30);
    const perimeter = 2 * side + base;

    return {
      questionText: `The perimeter of an isosceles triangle is ${perimeter} inches. Each of the two congruent sides of the triangle has a length of ${side} inches. What is the length, in inches, of the third side?`,
      figureCode: null,
      options: null,
      correctAnswer: base.toString(),
      explanation: `Perimeter = sum of all sides: $${side} + ${side} + x = ${perimeter}$. So $${2 * side} + x = ${perimeter}$, giving $x = ${base}$. The third side is ${base} inches.`
    };
  }
};

/**
* Question ID: 40ba6288
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 10-90, subtract: 5-20]
* - Difficulty factors: [Expression evaluation without solving for x]
* - Distractor patterns: [A: sign error, C: arithmetic error, D: added instead]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
