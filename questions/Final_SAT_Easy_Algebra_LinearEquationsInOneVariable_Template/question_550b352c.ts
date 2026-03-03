import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 550b352c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, const1: 2-10, rightSide: 10-30]
* - Difficulty factors: [Number of solutions concept]
* - Distractor patterns: [A: no solution confusion, C: wrong count, D: infinite confusion]
* - Constraints: [Linear equation always has exactly one solution]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_550b352c = {
  metadata: {
    // id: "550b352c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const const1 = getRandomInt(2, 10);
    const rightSide = getRandomInt(10, 30);

    const optionsData = [
      { text: "None", isCorrect: false, reason: "would require a false statement like 0 = 5" },
      { text: "Exactly 1", isCorrect: true },
      { text: "Exactly 3", isCorrect: false, reason: "linear equations cannot have exactly 3 solutions" },
      { text: "Infinitely many", isCorrect: false, reason: "would require an identity like 5 = 5" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `How many solutions exist to the equation $${rightSide} = ${coeff}x + ${const1}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "Exactly 1",
      explanation: `Solving: ${coeff}x = ${rightSide - const1}, so x = ${(rightSide - const1) / coeff}. One specific solution. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 87071893
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 20-60, result: 30-80]
* - Difficulty factors: [Simple subtraction]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
