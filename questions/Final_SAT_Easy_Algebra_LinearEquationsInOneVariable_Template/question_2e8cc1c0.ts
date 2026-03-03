import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 2e8cc1c0
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 2-8, multiplier: 4-8]
* - Difficulty factors: [Expression scaling with fractions]
* - Distractor patterns: [A: fraction error, B: multiplier only, D: no scaling]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_2e8cc1c0 = {
  metadata: {
    // id: "2e8cc1c0",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);
    const rightSide = getRandomInt(2, 8);
    const multiplier = getRandomInt(4, 8);
    const result = multiplier * rightSide;

    const distractorA = (multiplier / 2) * rightSide;
    const distractorB = multiplier;
    const distractorD = multiplier * coeff * rightSide;

    const optionsData = [
      { text: `\\(\\frac{${distractorA}}{2}\\)`, isCorrect: false, reason: "fraction calculation error" },
      { text: distractorB.toString(), isCorrect: false, reason: "just the multiplier" },
      { text: result.toString(), isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "multiplies without solving" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If \\( ${coeff}x = ${rightSide} \\), what is the value of \\( ${multiplier * coeff}x \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `${multiplier * coeff}x = ${multiplier} × (${coeff}x) = ${multiplier} × ${rightSide} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: c7d7980e
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff1: 8-20, coeff2: 1-19, result: 5-15]
* - Difficulty factors: [Collecting like terms with x on both sides]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
