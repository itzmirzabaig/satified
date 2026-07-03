import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 690
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeters sum: 63, coefficients: 3, 6]
 * - Difficulty factors: [Interpreting coefficient in geometric context]
 * - Distractor patterns: [Confusing number of sides with side length]
 * - Constraints: [Clear interpretation]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_690 = {
  metadata: {
    id: "690",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters.
    // sideA, sideB are the per-side lengths (the equation's coefficients).
    // Keep the two coefficients distinct so "interpret <sideB>" is unambiguous.
    const sideA = getRandomInt(2, 6);
    let sideB = getRandomInt(3, 9);
    let guard = 0;
    while (sideB === sideA && guard++ < 50) sideB = getRandomInt(3, 9);
    if (sideB === sideA) sideB = sideA + 1; // deterministic fallback
    const sum = getRandomInt(40, 100);

    // STEP 2: Create options. The coefficient of y is the side length of
    // figure B; distractors swap "side length" <-> "number of sides" and A <-> B.
    const optionsData = [
      { text: `Each side of figure B has a length of ${sideB} inches.`, isCorrect: true },
      { text: `The number of sides of figure B is ${sideB}.`, isCorrect: false },
      { text: `Each side of figure A has a length of ${sideB} inches.`, isCorrect: false },
      { text: `The number of sides of figure A is ${sideB}.`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `Figure A and figure B are both regular polygons. The sum of the perimeter of figure A and the perimeter of figure B is ${sum} inches. The equation $${sideA}x + ${sideB}y = ${sum}$ represents this situation, where x is the number of sides of figure A and y is the number of sides of figure B. Which statement is the best interpretation of $${sideB}$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Since figure A and figure B are regular polygons and $${sideA}x + ${sideB}y = ${sum}$ represents the sum of their perimeters, the term $${sideA}x$ is the perimeter of figure A and the term $${sideB}y$ is the perimeter of figure B. Because y is the number of sides of figure B, the coefficient $${sideB}$ must be the length of each side of figure B, in inches.`
    };
  }
};
