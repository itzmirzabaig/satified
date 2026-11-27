import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1153
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [30 sides, 8, 3, 5 (multiplier), 6 (constant) - mixed ranges]
 * - Difficulty factors: [Polygon side counting equation, same structure as frying pan problems]
 * - Distractor patterns: [A: forgets n for 3cm, B: correct, C: multiplies lengths, D: calculates perimeter]
 * - Constraints: [Total must be 30 sides]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED: "30-sided polygon" phrasing, choices printed without math, a markdown
 * explanation with a broken "5$n$" and a "1n" term, a distractor whose reason was
 * "mixing lengths with counts randomly", a perimeter distractor that used a length
 * for the unknown third side, and draws where two of the "three lengths" were equal.
 */

export const generator_1153 = {
  metadata: {
    id: "1153",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let totalSides: number, length1: number, length2: number, multiplier: number, constantSides: number, nCoeff: number;

    // Redraw until n is a whole number and the two given lengths differ.
    do {
      totalSides = getRandomInt(25, 40);
      length1 = getRandomInt(6, 12);
      length2 = getRandomInt(3, 7);
      multiplier = getRandomInt(4, 7);
      constantSides = getRandomInt(4, 10);
      nCoeff = multiplier + 1;
    } while ((totalSides - constantSides) % nCoeff !== 0 || length1 === length2);

    const lengthCoeff = length2 + length1 * multiplier;

    const correctEquation = `${nCoeff}n+${constantSides}=${totalSides}`;

    const optionsData = [
      { text: `$${correctEquation}$`, isCorrect: true, reason: '' },
      { text: `$${multiplier}n+${constantSides}=${totalSides}$`, isCorrect: false, reason: `$${multiplier}n$ counts only the sides with length ${length1} cm and leaves out the $n$ sides with length ${length2} cm` },
      { text: `$${nCoeff}n=${totalSides}$`, isCorrect: false, reason: `it leaves out the ${constantSides} sides with the third length` },
      { text: `$${lengthCoeff}n+${constantSides}=${totalSides}$`, isCorrect: false, reason: `$${lengthCoeff}n$ comes from multiplying each number of sides by its length, $${length2}n+${length1}(${multiplier}n)$, which adds lengths instead of counting sides` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Each side of a polygon with ${totalSides} sides has one of three lengths. The number of sides with length ${length1} centimeters (cm) is ${multiplier} times the number of sides $n$ with length ${length2} cm. There are ${constantSides} sides with the third length. Which equation must be true for the value of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. There are $n$ sides with length ${length2} cm, $${multiplier}n$ sides with length ${length1} cm, and ${constantSides} sides with the third length. The polygon has ${totalSides} sides in all, so $n+${multiplier}n+${constantSides}=${totalSides}$. Combining like terms gives $${correctEquation}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
