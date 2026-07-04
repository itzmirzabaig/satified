import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 110
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 2-8, multiplier: 4-8]
* - Difficulty factors: [Expression scaling with fractions]
* - Distractor patterns: [A: fraction error, B: multiplier only, D: no scaling]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_110 = {
  metadata: {
    id: "110",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the correct answer and all three distractors are four
    // distinct integers (guards the rightSide===multiplier collision and any
    // over-multiply overlap). Bounded so an unlucky draw can never hang.
    let coeff = 0, rightSide = 0, multiplier = 0, result = 0;
    let distractorA = 0, distractorB = 0, distractorD = 0;
    let tries = 0;
    do {
      coeff = getRandomInt(2, 6);
      rightSide = getRandomInt(2, 8);
      multiplier = getRandomInt(4, 8);
      result = multiplier * rightSide;

      distractorA = rightSide;                    // forgot to scale at all
      distractorB = multiplier;                   // used only the scale factor
      distractorD = multiplier * coeff * rightSide; // multiplied the full new coefficient
    } while (
      new Set([result, distractorA, distractorB, distractorD]).size !== 4 &&
      ++tries < 50
    );

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "this is the value of the given expression before scaling" },
      { text: distractorB.toString(), isCorrect: false, reason: "this is only the scale factor, not multiplied by the given value" },
      { text: result.toString(), isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "this multiplies the full coefficient by the value instead of scaling" }
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
