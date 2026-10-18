import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 152
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 10-20, const1: 20-50, result: 50-300]
* - Difficulty factors: [Equivalent equations, subtraction]
* - Distractor patterns: [adding the constant instead of subtracting,
*   subtracting in the wrong order, not changing the right side]
* - Constraints: [Clean integer result]
*
* FIX NOTES:
* Choices used display math ($$...$$), so each was a tall block and the list
* needed a scrollbar; they are inline now. Two distractors had no real error
* behind them (kx = const1, "kept the wrong constant", and result minus a
* random amount, "subtracted the wrong amount").
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_152 = {
  metadata: {
    id: "152",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(10, 20);

    const const1 = getRandomInt(20, 50);
    const rightSide = const1 + coeff * getRandomInt(5, 15);
    const result = rightSide - const1;

    // Inline math keeps each choice on one line (display math made every choice
    // a tall block). The four right sides are distinct: -result < 0 < result <
    // rightSide < rightSide + const1.
    const optionsData = [
      { text: `$${coeff}x = ${rightSide + const1}$`, isCorrect: false, reason: `it results from adding ${const1} to ${rightSide} instead of subtracting ${const1} from ${rightSide}` },
      { text: `$${coeff}x = ${-result}$`, isCorrect: false, reason: `it results from subtracting ${rightSide} from ${const1} instead of subtracting ${const1} from ${rightSide}` },
      { text: `$${coeff}x = ${result}$`, isCorrect: true, reason: '' },
      { text: `$${coeff}x = ${rightSide}$`, isCorrect: false, reason: `it results from removing ${const1} from the left side without also subtracting ${const1} from the right side` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `$$${coeff}x + ${const1} = ${rightSide}$$ Which equation has the same solution as the given equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${coeff}x = ${result}$`,
      explanation: `Choice ${correctLetter} is correct. Subtracting ${const1} from both sides of the given equation yields $${coeff}x = ${rightSide} - ${const1}$, or $${coeff}x = ${result}$. Since this equation is equivalent to the given equation, it has the same solution. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
