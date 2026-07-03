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
    // Bounded guard: triangle inequality (base < 2*side) plus option-collision
    // checks (base !== side keeps the triangle non-equilateral and distinct
    // from distractor A; base !== side - 2 keeps base + 2 distinct from side).
    let side = getRandomInt(8, 18);
    let base = getRandomInt(5, 20);
    let tries = 0;
    while ((base >= 2 * side || base === side || base === side - 2) && tries++ < 50) {
      side = getRandomInt(8, 18);
      base = getRandomInt(5, 20);
    }
    if (base >= 2 * side || base === side || base === side - 2) {
      side = 10;
      base = 7;
    }

    const perimeter = 2 * side + base;

    const optionsData = [
      { text: side.toString(), isCorrect: false, reason: "it is the length of each of the two congruent sides, not the third side" },
      { text: (side + base).toString(), isCorrect: false, reason: `it results from subtracting the length of only one congruent side from the perimeter: ${perimeter} - ${side} = ${side + base}` },
      { text: base.toString(), isCorrect: true, reason: "" },
      { text: (base + 2).toString(), isCorrect: false, reason: `it results from an arithmetic error when subtracting ${2 * side} from ${perimeter}` }
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
