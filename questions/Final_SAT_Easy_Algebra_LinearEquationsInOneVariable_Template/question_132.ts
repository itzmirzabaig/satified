import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 132
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, xValue: 3-10, multiplier: 2-5]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [solved for x itself, reused the right-hand side,
*   added the multiplier instead of multiplying]
* - Constraints: [Clean integer result; distractors distinct by construction
*   for every draw (result >= 12 > xValue, multiplier >= 2, coeff >= 2)]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_132 = {
  metadata: {
    id: "132",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const xValue = getRandomInt(3, 10);
    const rightSide = coeff * xValue;
    const multiplier = getRandomInt(2, 5);
    const result = multiplier * rightSide;

    // Distinctness across every draw:
    //   result = multiplier*coeff*xValue >= 12 > 10 >= xValue
    //   rightSide = coeff*xValue differs from result (multiplier >= 2) and from xValue (coeff >= 2)
    //   rightSide + multiplier differs from result (would need rightSide <= 2), from
    //   rightSide (multiplier >= 2), and from xValue (coeff >= 2 makes it strictly larger)
    const optionsData = [
      { text: xValue.toString(), isCorrect: false, reason: `it is the value of the variable itself, found from $${coeff}x = ${rightSide}$, not the value of $${multiplier * coeff}x$` },
      { text: rightSide.toString(), isCorrect: false, reason: `it is the value of $${coeff}x$, not the value of $${multiplier * coeff}x$` },
      { text: (rightSide + multiplier).toString(), isCorrect: false, reason: `it results from adding ${multiplier} to ${rightSide} instead of multiplying ${rightSide} by ${multiplier}` },
      { text: result.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x = ${rightSide}$, what is the value of $${multiplier * coeff}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Since $${multiplier * coeff}x = ${multiplier}(${coeff}x)$ and $${coeff}x = ${rightSide}$, the value of $${multiplier * coeff}x$ is $${multiplier}(${rightSide}) = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
