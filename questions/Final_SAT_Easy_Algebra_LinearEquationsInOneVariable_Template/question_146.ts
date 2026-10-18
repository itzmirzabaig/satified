import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 146
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-9, rightSide: 6-72, targetCoeff: 4-45]
* - Difficulty factors: [Expression evaluation, scaling]
* - Distractor patterns: [value of x, adding the coefficient difference,
*   substituting the given value for x]
* - Constraints: [Clean integer result]
*
* FIX NOTES:
* Two distractors were rightSide - coeff and 3(targetCoeff - coeff), labeled
* "subtracting instead of dividing" and "wrong multiplication", which do not
* produce the value asked for. Each distractor now matches its reason.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_146 = {
  metadata: {
    id: "146",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 9);
    const x = getRandomInt(3, 8);
    const rightSide = coeff * x;
    const scale = getRandomInt(2, 5);
    const targetCoeff = scale * coeff;
    const result = scale * rightSide;

    // All distinct: x < rightSide < result; targetCoeff * rightSide = coeff * result
    // > result; rightSide + (targetCoeff - coeff) = result only if coeff = rightSide,
    // impossible since x >= 3.
    const optionsData = [
      { text: x.toString(), isCorrect: false, reason: `it is the value of $x$, not the value of $${targetCoeff}x$` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (rightSide + targetCoeff - coeff).toString(), isCorrect: false, reason: `it results from adding ${targetCoeff - coeff}, the difference between ${targetCoeff} and ${coeff}, to ${rightSide} instead of multiplying ${rightSide} by ${scale}` },
      { text: (targetCoeff * rightSide).toLocaleString('en-US'), isCorrect: false, reason: `it results from substituting ${rightSide} for $x$ in $${targetCoeff}x$, but ${rightSide} is the value of $${coeff}x$, not $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x = ${rightSide}$, what is the value of $${targetCoeff}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Since $${targetCoeff} = ${scale}(${coeff})$, the expression $${targetCoeff}x$ is equivalent to $${scale}(${coeff}x)$. Substituting ${rightSide} for $${coeff}x$ gives $${scale}(${rightSide}) = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
