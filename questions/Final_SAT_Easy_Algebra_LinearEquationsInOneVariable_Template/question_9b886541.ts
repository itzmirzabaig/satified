import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 9b886541
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-5, constants: 3-12]
* - Difficulty factors: [Solve for expression without finding x, or substitution method]
* - Distractor patterns: [A: sign error, B: value of x, C: arithmetic error]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_9b886541 = {
  metadata: {
    // id: "9b886541",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 5);
    const const1 = getRandomInt(3, 9);
    const rightSide = getRandomInt(5, 12);
    const addAmount = const1 * 2;

    const x = (rightSide + const1) / coeff;
    const targetValue = coeff * x + const1;

    const distractorA = rightSide - const1;
    const distractorB = x;
    const distractorC = coeff * x - const1 + 3;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "might result from a sign error" },
      { text: distractorB.toString(), isCorrect: false, reason: "is the value of x, not the value of the expression" },
      { text: distractorC.toString(), isCorrect: false, reason: "might result from calculating with wrong coefficients" },
      { text: targetValue.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x - ${const1} = ${rightSide}$, what is the value of $${coeff}x + ${const1}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: targetValue.toString(),
      explanation: `To find the value of $${coeff}x + ${const1}$, we can add $${addAmount}$ to both sides of the given equation: $${coeff}x - ${const1} + ${addAmount} = ${rightSide} + ${addAmount}$, which gives $${coeff}x + ${const1} = ${targetValue}$. Therefore, the value is $${targetValue}$, which corresponds to option ${correctLetter}. Why other options are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 590f2187
*
* ORIGINAL ANALYSIS:
* - Number ranges: [factor: 2-5, x: 10-20, const1: 10-30]
* - Difficulty factors: [Factoring to find equivalent expression]
* - Distractor patterns: [A: divided wrong, C: added instead of factored, D: added wrong]
* - Constraints: [Result must be integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
