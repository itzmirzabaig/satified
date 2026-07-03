import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 14
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients c1, c2: 2-9]
 * - Difficulty factors: [Multiplying variables, adding exponents]
 * - Distractor patterns: [missing z exponent, missing both exponents,
 *   adding the coefficients (including the implied 1) instead of multiplying]
 * - Constraints: [c1*c2 !== c1+c2+1, otherwise the "added the coefficients"
 *   distractor collides with the coeff*yz distractor (only pairs 2*3 / 3*2)]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_14 = {
  metadata: {
    id: "14",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c1 = getRandomInt(2, 9);
    let c2 = getRandomInt(2, 9);
    // c1*c2 = c1+c2+1 only for (c1,c2) = (2,3) or (3,2); redraw c2, bounded.
    let tries = 0;
    while (c1 * c2 === c1 + c2 + 1 && tries++ < 50) {
      c2 = getRandomInt(2, 9);
    }
    // Deterministic fallback: c1*5 = c1+6 has no integer solution.
    if (c1 * c2 === c1 + c2 + 1) c2 = 5;

    const coeff = c1 * c2;
    const sum = c1 + c2 + 1;
    const correctText = `$${coeff}y^{2}z^{2}$`;

    const optionsData = [
      {
        text: correctText,
        isCorrect: true,
        reason: ''
      },
      {
        text: `$${coeff}y^{2}z$`,
        isCorrect: false,
        reason: `multiplying the coefficients correctly but dropping one factor of $z$, so $z$ is not squared`
      },
      {
        text: `$${coeff}yz$`,
        isCorrect: false,
        reason: `multiplying the coefficients correctly but not adding the exponents of $y$ and $z$`
      },
      {
        text: `$${sum}yz$`,
        isCorrect: false,
        reason: `adding the coefficients, $ ${c1} + 1 + ${c2} = ${sum}$, instead of multiplying them, and not squaring the variables`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it comes from ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `Which expression is equivalent to $(${c1}yz)(y)(${c2}z)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Multiply the coefficients: $ ${c1} \\cdot 1 \\cdot ${c2} = ${coeff}$. Then multiply the variables by adding exponents: $y \\cdot y = y^{2}$ and $z \\cdot z = z^{2}$. The product is $ ${coeff}y^{2}z^{2}$. ${distractorNotes}`
    };
  }
};
