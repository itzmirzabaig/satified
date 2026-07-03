import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 141
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coefficient: 2-5, constants: 3-12]
* - Difficulty factors: [Solve for expression without finding x, or substitution method]
* - Distractor patterns: [A: sign error, B: value of x, C: arithmetic error]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_141 = {
  metadata: {
    id: "141",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first construction: pick an integer x, then derive rightSide so
    // every option is an integer. Guard (bounded) against:
    //  - rightSide - const1 < 1  (keeps the sign-error distractor positive)
    //  - x * (coeff - 1) === 2 * const1  (would make distractor A equal x)
    let coeff = getRandomInt(2, 5);
    let x = getRandomInt(4, 9);
    let const1 = getRandomInt(3, 9);
    let rightSide = coeff * x - const1;
    let tries = 0;
    while ((rightSide - const1 < 1 || x * (coeff - 1) === 2 * const1) && tries++ < 50) {
      coeff = getRandomInt(2, 5);
      x = getRandomInt(4, 9);
      const1 = getRandomInt(3, 9);
      rightSide = coeff * x - const1;
    }
    if (rightSide - const1 < 1 || x * (coeff - 1) === 2 * const1) {
      coeff = 3;
      x = 5;
      const1 = 4;
      rightSide = 11; // 3*5 - 4
    }

    const addAmount = const1 * 2;
    const targetValue = coeff * x + const1; // = rightSide + 2*const1

    const distractorA = rightSide - const1;
    const distractorB = x;
    const distractorC = coeff * x; // = rightSide + const1

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: `results from a sign error: computing ${rightSide} - ${const1} instead of ${rightSide} + ${addAmount}` },
      { text: distractorB.toString(), isCorrect: false, reason: `is the value of $x$, not the value of the expression $${coeff}x + ${const1}$` },
      { text: distractorC.toString(), isCorrect: false, reason: `is the value of $${coeff}x$; it results from adding ${const1} to ${rightSide} only once` },
      { text: targetValue.toString(), isCorrect: true, reason: "" }
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
