import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 58
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-12, sqrtRes: 3-9, targetVal: coeff * sqrtRes, xVal: sqrtRes * sqrtRes]
 * - Difficulty factors: [Solving a radical equation for x]
 * - Distractor patterns: [Root value, coefficient, root value plus one]
 * - Constraints: [x must be a perfect square; coeff must not collide with any option value]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_58 = {
  metadata: {
    id: "58",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sqrtRes = getRandomInt(3, 9);
    const xVal = sqrtRes * sqrtRes;

    // Guard: coeff must differ from every option value (xVal, sqrtRes, xVal + 1)
    // so no two options can ever collide.
    let coeff = getRandomInt(2, 12);
    let tries = 0;
    while ((coeff === sqrtRes || coeff === xVal || coeff === xVal + 1) && tries++ < 50) {
      coeff = getRandomInt(2, 12);
    }
    if (coeff === sqrtRes || coeff === xVal || coeff === xVal + 1) {
      coeff = 2; // deterministic fallback: 2 never equals sqrtRes (>=3), xVal (>=9), or xVal+1 (>=10)
    }

    const targetVal = coeff * sqrtRes;

    const optCorrect = { text: `${xVal}`, isCorrect: true };
    const optRoot = { text: `${sqrtRes}`, isCorrect: false };
    const optCoeff = { text: `${coeff}`, isCorrect: false };
    const optOffByOne = { text: `${xVal + 1}`, isCorrect: false };

    const shuffled = shuffle([optCorrect, optRoot, optCoeff, optOffByOne])
      .map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const rootLetter = shuffled.find(o => !o.isCorrect && o.text === optRoot.text)!.letter;
    const coeffLetter = shuffled.find(o => !o.isCorrect && o.text === optCoeff.text)!.letter;
    const offByOneLetter = shuffled.find(o => !o.isCorrect && o.text === optOffByOne.text)!.letter;

    return {
      questionText: `The function $f$ is defined by $f(x)=${coeff}\\sqrt{x}$. For what value of $x$ does $f(x)=${targetVal}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Setting $f(x)=${targetVal}$ in the definition $f(x)=${coeff}\\sqrt{x}$ gives the equation $\\sqrt{x}=\\frac{${targetVal}}{${coeff}}=${sqrtRes}$ after dividing both sides by ${coeff}. Squaring both sides gives $x=${sqrtRes}^2=${xVal}$. Choice ${rootLetter} is incorrect; ${sqrtRes} is the value of $\\sqrt{x}$, not the value of $x$. Choice ${coeffLetter} is incorrect; ${coeff} is the coefficient of $\\sqrt{x}$ in the definition of $f$, not the value of $x$. Choice ${offByOneLetter} is incorrect; it is one more than the correct value of $x$.`
    };
  }
};
