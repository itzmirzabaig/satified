import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 3d04de9c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [total: 20-50, blue: 5-45]
* - Difficulty factors: [Simple subtraction word problem]
* - Distractor patterns: [B: blue count, C: total, D: added instead of subtracted]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_3d04de9c = {
  metadata: {
    // id: "3d04de9c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(20, 50);
    const blue = getRandomInt(5, total - 5);
    const yellow = total - blue;

    const optionsData = [
      { text: yellow.toString(), isCorrect: true },
      { text: blue.toString(), isCorrect: false, reason: "is the number of blue flags" },
      { text: total.toString(), isCorrect: false, reason: "is the total number of flags" },
      { text: (total + 5).toString(), isCorrect: false, reason: "results from incorrect addition" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A principal used a total of $${total}$ flags that were either blue or yellow. The principal used $${blue}$ blue flags. How many yellow flags were used?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yellow.toString(),
      explanation: `Yellow = Total - Blue = $${total} - ${blue} = ${yellow}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 60f71697
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-12, result: 5-20]
* - Difficulty factors: [Simple division]
* - Distractor patterns: [B: subtraction, C: addition, D: multiplication]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
