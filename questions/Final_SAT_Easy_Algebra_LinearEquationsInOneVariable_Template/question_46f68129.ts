import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 46f68129
*
* ORIGINAL ANALYSIS:
* - Number ranges: [perChild: 2-5, numChildren: 10-30, leftover: 2-10]
* - Difficulty factors: [Word problem, setting up equation]
* - Distractor patterns: [A: wrong calc, C: too many, D: way too many]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_46f68129 = {
  metadata: {
    // id: "46f68129",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const perChild = getRandomInt(2, 5);
    const numChildren = getRandomInt(10, 30);
    const leftover = getRandomInt(2, 10);
    const total = perChild * numChildren + leftover;

    const optionsData = [
      { text: (numChildren - 3).toString(), isCorrect: false, reason: "wrong calculation" },
      { text: numChildren.toString(), isCorrect: true },
      { text: (numChildren + 7).toString(), isCorrect: false, reason: "too many children" },
      { text: (numChildren + 11).toString(), isCorrect: false, reason: "way too many" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A librarian has ${total} books. If he gives each child ${perChild} books, he has ${leftover} left. How many children?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numChildren.toString(),
      explanation: `Equation: ${perChild}c + ${leftover} = ${total}. Subtract: ${perChild}c = ${total - leftover}. Divide: c = ${numChildren}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 1735436
*
* ORIGINAL ANALYSIS:
* - Number ranges: [initial: 3000-6000, daily: 50-100, days: 20-60]
* - Difficulty factors: [Word problem, linear decrease]
* - Distractor patterns: [A: too few, C: too many, D: way too many]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
