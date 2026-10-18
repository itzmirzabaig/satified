import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 118
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-10, rightSide: 3-10, multiplier: 3-10]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [the scale factor, adding instead of multiplying,
*   substituting the given value for x]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* Two distractors were rightSide - 3 (which could be 0) and result + 3,
* labeled "wrong value" and "wrong addition". Every distractor now comes from
* a stated error and the explanation is typeset.
*/

export const generator_118 = {
  metadata: {
    id: "118",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 10);
    const rightSide = getRandomInt(3, 10);
    const multiplier = getRandomInt(3, 10);
    const result = multiplier * rightSide;

    const big = multiplier * coeff;
    // All four values are distinct: rightSide >= 3 and coeff >= 2 separate
    // multiplier, multiplier + rightSide, multiplier * rightSide and big * rightSide.
    const optionsData = [
      { text: multiplier.toString(), isCorrect: false, reason: `it is the number that $${coeff}x$ is multiplied by to get $${big}x$, not the value of $${big}x$` },
      { text: (multiplier + rightSide).toString(), isCorrect: false, reason: `it results from adding ${multiplier} and ${rightSide} instead of multiplying them` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (big * rightSide).toString(), isCorrect: false, reason: `it results from substituting ${rightSide} for $x$ in $${big}x$, but ${rightSide} is the value of $${coeff}x$, not $x$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x = ${rightSide}$, what is the value of $${big}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Since $${big} = ${multiplier}(${coeff})$, the expression $${big}x$ is equivalent to $${multiplier}(${coeff}x)$. Substituting ${rightSide} for $${coeff}x$ gives $${multiplier}(${rightSide}) = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
