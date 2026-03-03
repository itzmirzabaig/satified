import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 9ff10b3b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [d1: 1-3, factor: 2-3]
* - Difficulty factors: [Fraction arithmetic, common denominators]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_9ff10b3b = {
  metadata: {
    // id: "9ff10b3b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const fMinusOne = getRandomInt(1, 3);
    const f = fMinusOne + 1;
    const d1Multiplier = getRandomInt(1, 4);
    const d1 = fMinusOne * d1Multiplier;
    const d2 = d1 * f;
    const xValue = (f * d1) / (f - 1);

    const optionsData = [
      { text: (-xValue).toString(), isCorrect: false, reason: "negative value error" },
      { text: `\\(\\frac{1}{3}\\)`, isCorrect: false, reason: "wrong operation" },
      { text: xValue.toString(), isCorrect: true },
      { text: (xValue * 2).toString(), isCorrect: false, reason: "calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $\\frac{1}{${d1}}x - \\frac{1}{${d2}}x = 1$, what is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: xValue.toString(),
      explanation: `To solve for $x$, find a common denominator for the fractions, which is ${d2}. This gives $\\frac{${f}}{${d2}}x - \\frac{1}{${d2}}x = 1$, or $\\frac{${f - 1}}{${d2}}x = 1$. Multiplying by the reciprocal $\\frac{${d2}}{${f - 1}}$ gives $x = ${xValue}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 902871
*
* ORIGINAL ANALYSIS:
* - Number ranges: [a: 2-5, b: 2-6, c: 2-6, result: 5-12]
* - Difficulty factors: [Distributing, combining like terms]
* - Distractor patterns: [B: distribution error, C/D: large number]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
