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
      questionText: `If \\( \\frac{x}{${denom}} = ${numer} \\), what is the value of \\( \\frac{${denom}}{x} \\)?`,
      figureCode: null,
      options: null,
      correctAnswer: `\\frac{1}{${numer}}`,
      explanation: `Since $\\frac{x}{${denom}} = ${numer} = \\frac{${numer}}{1}$, this is equivalent to $\\frac{${denom}}{x} = \\frac{1}{${numer}}$. Alternatively, $x = ${denom * numer}$, so $\\frac{${denom}}{x} = \\frac{${denom}}{${denom * numer}} = \\frac{1}{${numer}}$.`
    };
  }
};
