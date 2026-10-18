import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 142
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side: 8-18, base: 5-20]
* - Difficulty factors: [Geometric context, perimeter formula]
* - Distractor patterns: [congruent side, perimeter minus one side, treating the
*   given side as the third side]
* - Constraints: [Triangle inequality; side + base even]
*
* FIX NOTES:
* One distractor was base + 2, "an arithmetic error when subtracting". It is
* now (perimeter - side) / 2, from reading the given side as the third side.
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
    // Redraw until: triangle inequality (base < 2*side); base !== side keeps the
    // triangle non-equilateral and every choice distinct; side + base even so
    // the "16 is the third side" distractor (perimeter - side) / 2 is an integer.
    let side = 10, base = 8;
    do {
      side = getRandomInt(8, 18);
      base = getRandomInt(5, 20);
    } while (base >= 2 * side || base === side || (side + base) % 2 !== 0);

    const perimeter = 2 * side + base;

    const optionsData = [
      { text: side.toString(), isCorrect: false, reason: "it is the length of each of the two congruent sides, not the third side" },
      { text: (side + base).toString(), isCorrect: false, reason: `it results from subtracting the length of only one congruent side from the perimeter: $${perimeter} - ${side} = ${side + base}$` },
      { text: base.toString(), isCorrect: true, reason: "" },
      { text: ((side + base) / 2).toString(), isCorrect: false, reason: `it results from treating ${side} feet as the length of the third side and finding the length of each congruent side: $\\frac{${perimeter} - ${side}}{2} = ${(side + base) / 2}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The perimeter of an isosceles triangle is ${perimeter} feet. Each of the two congruent sides has length ${side} feet. What is the length, in feet, of the third side?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: base.toString(),
      explanation: `Let $x$ be the length of the third side. The perimeter is the sum of all three side lengths, so $${side} + ${side} + x = ${perimeter}$. This simplifies to $${2 * side} + x = ${perimeter}$, so $x = ${perimeter} - ${2 * side} = ${base}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};
