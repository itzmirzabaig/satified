import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 154
*
* ORIGINAL ANALYSIS:
* - Number ranges: [xCoeff: 2-6, const1: 20-50, const2: 5-15]
* - Difficulty factors: [Equivalent equations, subtracting from both sides]
* - Distractor patterns: [adding the constant instead of subtracting, leaving
*   the right side unchanged, subtracting in the wrong order]
* - Constraints: [Clean integer result]
*
* FIX NOTES:
* The distractors were result + 20, result + 10 and half the result, all
* explained as "results from calculation errors", and the choices were plain
* text (3x = 34 untypeset). Each choice is now typeset with a real reason.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_154 = {
  metadata: {
    id: "154",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const xCoeff = getRandomInt(2, 6);
    const const1 = getRandomInt(20, 50);
    const const2 = getRandomInt(5, 15);
    const result = const1 - const2;

    // Right sides are distinct: -result < 0 < result < const1 < const1 + const2.
    const optionsData = [
      { text: `$${xCoeff}x = ${const1 + const2}$`, isCorrect: false, reason: `it results from adding ${const2} to ${const1} instead of subtracting ${const2} from ${const1}` },
      { text: `$${xCoeff}x = ${const1}$`, isCorrect: false, reason: `it results from removing ${const2} from the left side without also subtracting ${const2} from the right side` },
      { text: `$${xCoeff}x = ${result}$`, isCorrect: true, reason: '' },
      { text: `$${xCoeff}x = ${-result}$`, isCorrect: false, reason: `it results from subtracting ${const1} from ${const2} instead of subtracting ${const2} from ${const1}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Which equation has the same solution as the given equation? $$${xCoeff}x + ${const2} = ${const1}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${xCoeff}x = ${result}$`,
      explanation: `Choice ${correctLetter} is correct. Subtracting ${const2} from both sides of the given equation yields $${xCoeff}x = ${const1} - ${const2}$, or $${xCoeff}x = ${result}$. Since this equation is equivalent to the given equation, it has the same solution. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
