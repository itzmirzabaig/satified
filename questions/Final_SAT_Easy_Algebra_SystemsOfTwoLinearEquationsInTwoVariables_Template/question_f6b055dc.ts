import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f6b055dc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and -1, intercept: 0 and 4]
 * - Difficulty factors: [Symmetric lines, finding intersection]
 * - Constraints: [Intersection at integer coordinates]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Perpendicular diagonal lines]
 */

export const generator_f6b055dc = {
  metadata: {
    // id: "f6b055dc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const intercept = getRandomInt(3, 6) * 2;
    const finalX = intercept / 2;
    const finalY = finalX;

    const mafsCode = `
      <Coordinates.Cartesian />
      <Plot.OfX y={(x) => x} color="#1a7cff" />
      <Plot.OfX y={(x) => -x + ${intercept}} color="#ff2a7a" />
    `;

    const optionsData = [
      { text: `(0, ${intercept})`, isCorrect: false, reason: "uses the y-intercept" },
      { text: `(${finalX}, ${finalY})`, isCorrect: true },
      { text: `(${intercept}, 0)`, isCorrect: false, reason: "uses the x-intercept" },
      { text: `(${intercept}, ${intercept})`, isCorrect: false, reason: "uses the intercept value incorrectly" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The lines $y = x$ and $y = -x + ${intercept}$ intersect where $x = -x + ${intercept}$, so $2x = ${intercept}$, giving $x = ${finalX}$ and $y = ${finalY}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The graph of a system of two linear equations is shown. What is the solution $(x, y)$ to the system?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `(${finalX}, ${finalY})`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 0d1dca87
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 3, x-value: 2-5, result: 15-30]
 * - Difficulty factors: [Standard form substitution]
 * - Constraints: [Integer answer]
 * - Question type: [Direct Solve→Fill in the blank]
 * - Figure generation: [None]
 */