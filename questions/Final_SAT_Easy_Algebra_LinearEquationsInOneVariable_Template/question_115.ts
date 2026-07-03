import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 115
*
* ORIGINAL ANALYSIS:
* - Number ranges: [total: 20-50, blue: 5-45]
* - Difficulty factors: [Simple subtraction word problem]
* - Distractor patterns: [B: blue count, C: total, D: added instead of subtracted]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_115 = {
  metadata: {
    id: "115",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(20, 50);
    let blue = getRandomInt(5, total - 5);
    // Guard: if blue is exactly half the total, yellow would equal blue
    // (duplicate option). Nudge by 1; blue + 1 <= total - 5 holds since total >= 20.
    if (blue * 2 === total) blue += 1;
    const yellow = total - blue;

    const optionsData = [
      { text: yellow.toString(), isCorrect: true },
      { text: blue.toString(), isCorrect: false, reason: "is the number of blue flags" },
      { text: total.toString(), isCorrect: false, reason: "is the total number of flags" },
      { text: (total + blue).toString(), isCorrect: false, reason: "results from adding the number of blue flags to the total instead of subtracting" }
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
