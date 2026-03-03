import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4fb8adf7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4, x-value: 6-10, result: positive]
 * - Difficulty factors: [Solve for y after substitution]
 * - Distractor patterns: [Sign errors, wrong operations]
 * - Constraints: [Integer solution]
 * - Question type: [Direct Solve→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_4fb8adf7 = {
  metadata: {
    // id: "4fb8adf7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(6, 12);
    const coef = getRandomInt(3, 6);
    const y = getRandomInt(5, 12);
    const total = coef * x - 3 * y;

    const optionsData = [
      { text: `(${x}, ${y})`, isCorrect: true },
      { text: `(${x}, ${-3 * y})`, isCorrect: false, reason: "forgets to divide by -3" },
      { text: `(${x}, ${-y})`, isCorrect: false, reason: "makes a sign error" },
      { text: `(${x}, ${3 * y})`, isCorrect: false, reason: "forgets the negative sign" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Substitute $x = ${x}$ into the first equation: $${coef}(${x}) - 3y = ${total}$. This gives $${coef * x} - 3y = ${total}$, so $-3y = ${total - coef * x}$, which simplifies to $-3y = ${-3 * y}$, and $y = ${y}$. The solution is $(${x}, ${y})$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `What is the solution $(x, y)$ to the given system of equations?$$\\begin{aligned} ${coef}x - 3y &= ${total} \\\\ x &= ${x} \\end{aligned}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(${x}, ${y})`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 4b06557b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 2 and -2, intercepts: -7 and 9]
 * - Difficulty factors: [Reading x-coordinate from graph intersection]
 * - Constraints: [Intersection at integer x-coordinate]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Two lines with opposite slopes]
 */