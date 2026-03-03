import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ccc3ad6b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: -3 and -0.5, intercepts: 3 and -2]
 * - Difficulty factors: [Negative y-coordinate, finding intersection]
 * - Constraints: [Intersection at integer coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Lines with negative slopes]
 */

export const generator_ccc3ad6b = {
  metadata: {
    // id: "ccc3ad6b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(3, 6);
    const y = -1 * getRandomInt(3, 6);
    const m1 = -3;
    const b1 = y - m1 * x;
    const m2 = -0.5;
    const b2 = y - m2 * x;

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => -3 * x + ${b1}} color="#1a7cff" />
      <Plot.OfX y={(x) => -0.5 * x + ${b2}} color="#ff2a7a" />
    `;

    const optionsData = [
      { text: `(${x + 1}, ${y - 2})`, isCorrect: false, reason: "chooses an incorrect nearby point" },
      { text: `(0, ${b1})`, isCorrect: false, reason: "uses the y-intercept of one line" },
      { text: `(0, ${Math.floor(b2)})`, isCorrect: false, reason: "uses the y-intercept of other line" },
      { text: `(${x}, ${y})`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The solution is the intersection point of the two lines, which is at $(${x}, ${y})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

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
 * Question ID: 19523
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [novel price: 4, magazine: 1, total items: 10-15, total cost: 20-30]
 * - Difficulty factors: [Word problem requiring solution, not just setup]
 * - Distractor patterns: [Off-by-one, wrong item count, reversed items]
 * - Constraints: [Valid integer solution]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */