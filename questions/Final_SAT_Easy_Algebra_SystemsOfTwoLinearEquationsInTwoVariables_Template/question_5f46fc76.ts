import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5f46fc76
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and -1, intercepts: 1 and -7]
 * - Difficulty factors: [Intersection in negative quadrant]
 * - Constraints: [Integer intersection coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Lines intersecting in third quadrant]
 */

export const generator_5f46fc76 = {
  metadata: {
    // id: "5f46fc76",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = -1 * getRandomInt(3, 6);
    const y = -1 * getRandomInt(2, 5);
    const b1 = y - x;
    const b2 = y + x;

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => x + ${b1}} color="#1a7cff" />
      <Plot.OfX y={(x) => -x + ${b2}} color="#ff2a7a" />
    `;

    const optionsData = [
      { text: `(0, ${b2})`, isCorrect: false, reason: "uses the y-intercept" },
      { text: `(0, ${Math.floor((b1 + b2) / 2)})`, isCorrect: false, reason: "uses an incorrect intercept value" },
      { text: `(${x}, ${y})`, isCorrect: true },
      { text: `(${x}, 0)`, isCorrect: false, reason: "uses the x-coordinate only" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The solution is the intersection point of the two lines. Setting $x + ${b1} = -x + ${b2}$: $2x = ${b2 - b1}$, so $x = ${x}$ and $y = ${y}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The graph of a system of linear equations is shown. What is the solution $(x, y)$ to the system?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(${x}, ${y})`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7d89376f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price1: 80-100, price2: 200-300, total: 100-150, revenue: 20000-30000]
 * - Difficulty factors: [Setting up system for ticket sales]
 * - Distractor patterns: [Swapped totals, multiplied totals, wrong price assignment]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */