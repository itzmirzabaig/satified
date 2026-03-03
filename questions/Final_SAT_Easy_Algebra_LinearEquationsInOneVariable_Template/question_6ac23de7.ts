import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 6ac23de7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [numer/denom: 2-6, multiplier: 2-6]
* - Difficulty factors: [Fractional coefficient, two-step solving]
* - Distractor patterns: [B: added, C: wrong order of ops, D: subtracted]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_6ac23de7 = {
  metadata: {
    // id: "6ac23de7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numer = getRandomInt(2, 6);
    const denom = getRandomInt(2, 6);
    const multiplier = getRandomInt(2, 6);
    const result = denom * multiplier;
    const rightSide = numer * multiplier;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: (rightSide + numer).toString(), isCorrect: false, reason: "may result from adding the right side and the numerator" },
      { text: (Math.floor(rightSide / denom) * numer).toString(), isCorrect: false, reason: "may result from dividing by the denominator then multiplying by the numerator" },
      { text: (rightSide - denom).toString(), isCorrect: false, reason: "may result from subtracting the denominator from the right side" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the equation $\\frac{${numer}x}{${denom}} = ${rightSide}$, what is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Multiply by ${denom}: $${numer}x = ${rightSide * denom}$. Divide by ${numer}: $x = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 7392dfc1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-4, xCoeff: 4-8, const1: 4-20]
* - Difficulty factors: [Equivalent equations, dividing by common factor]
* - Distractor patterns: [A: wrong division, B: divided by 4, C: divided by 3]
* - Constraints: [Must have common factor]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
