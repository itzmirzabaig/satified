import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 155
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-4, multiplier: 4, baseCoeff: 2-4]
* - Difficulty factors: [Expression scaling, recognizing multiples]
* - Distractor patterns: [value of the given left side, value of the scaled
*   x term alone, adding the scaled constant again]
* - Constraints: [Clean integer result]
*
* FIX NOTES:
* The explanation printed "4 \times 18" outside math mode, so a raw "\times"
* showed on the page, and the distractors were result - 8, + 8 and + 12, each
* "results from calculation errors". The explanation is typeset and each
* distractor now comes from a real error.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_155 = {
  metadata: {
    id: "155",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const multiplier = 4;
    // Redraw if rightSide equals const1 (x would be 0, as in "4x + 6 = 6") or
    // equals multiplier * (rightSide - const1), the value of the x term alone;
    // the other choices never coincide.
    let factor = 2, xCoeff = 4, const1 = 2, rightSide = 6;
    do {
      factor = getRandomInt(2, 4);
      xCoeff = factor * getRandomInt(2, 4);
      const1 = factor * getRandomInt(1, 4);
      rightSide = factor * getRandomInt(3, 8);
    } while (rightSide === const1 || rightSide === multiplier * (rightSide - const1));
    const result = multiplier * rightSide;
    const bigX = multiplier * xCoeff, bigC = multiplier * const1;

    const optionsData = [
      { text: rightSide.toString(), isCorrect: false, reason: `it is the value of $${xCoeff}x + ${const1}$, not the value of $${bigX}x + ${bigC}$` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (result - bigC).toString(), isCorrect: false, reason: `it is the value of $${bigX}x$, not the value of $${bigX}x + ${bigC}$` },
      { text: (result + bigC).toString(), isCorrect: false, reason: `it results from adding ${bigC} to $${multiplier}(${rightSide})$, but $${multiplier}(${rightSide})$ already includes the constant term ${bigC}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${xCoeff}x + ${const1} = ${rightSide}$, what is the value of $${bigX}x + ${bigC}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. The expression $${bigX}x + ${bigC}$ is equivalent to $${multiplier}(${xCoeff}x + ${const1})$. Multiplying both sides of the given equation by ${multiplier} gives $${multiplier}(${xCoeff}x + ${const1}) = ${multiplier}(${rightSide})$, or $${bigX}x + ${bigC} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
