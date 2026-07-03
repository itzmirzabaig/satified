import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 112
*
* ORIGINAL ANALYSIS:
* - Number ranges: [denom: 2-10, numer: 2-10]
* - Difficulty factors: [Reciprocal relationship, or solve then substitute]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean fraction result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_112 = {
  metadata: {
    id: "112",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const denom = getRandomInt(2, 10);
    const numer = getRandomInt(2, 10);

    return {
      questionText: `If $\\frac{x}{${denom}} = ${numer}$, what is the value of $\\frac{${denom}}{x}$? (The answer may be entered as a fraction or a decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: `1/${numer}`,
      explanation: `Since $\\frac{x}{${denom}} = ${numer}$, taking the reciprocal of both sides gives $\\frac{${denom}}{x} = \\frac{1}{${numer}}$. Alternatively, multiplying both sides of $\\frac{x}{${denom}} = ${numer}$ by ${denom} gives $x = ${denom * numer}$, so $\\frac{${denom}}{x} = \\frac{${denom}}{${denom * numer}} = \\frac{1}{${numer}}$.`
    };
  }
};
