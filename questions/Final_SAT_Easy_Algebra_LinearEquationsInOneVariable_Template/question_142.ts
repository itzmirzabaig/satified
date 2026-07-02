import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 142
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side: 8-18, base: 5-20]
* - Difficulty factors: [Geometric context, perimeter formula]
* - Distractor patterns: [A: congruent side, B/D: wrong calc]
* - Constraints: [Triangle inequality]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_142 = {
  metadata: {
    id: "142",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const side = getRandomInt(8, 18);
    const base = getRandomInt(5, 20);
    const perimeter = 2 * side + base;

    const optionsData = [
      { text: side.toString(), isCorrect: false, reason: "is the length of congruent sides" },
      { text: (base - 4).toString(), isCorrect: false, reason: "wrong calculation" },
      { text: base.toString(), isCorrect: true },
      { text: (base + 2).toString(), isCorrect: false, reason: "wrong calculation" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The perimeter of an isosceles triangle is ${perimeter} feet. Each of the two congruent sides has length ${side} feet. What is the length of the third side?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: base.toString(),
      explanation: `${side} + ${side} + x = ${perimeter}, so ${2 * side} + x = ${perimeter}, giving x = ${base}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
