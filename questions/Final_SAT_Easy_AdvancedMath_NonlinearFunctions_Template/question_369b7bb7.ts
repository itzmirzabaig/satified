import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 369b7bb7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-12, x: 2-8, result: 3-9]
 * - Difficulty factors: [Evaluating square root functions]
 * - Distractor patterns: [Forgetting square root, division by coeff, multiplication error]
 * - Constraints: [Result must be a perfect square for Easy difficulty]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_369b7bb7 = {
  metadata: {
    // id: "369b7bb7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // For Easy difficulty, use simple perfect squares (3-7)
    const finalResult = getRandomInt(3, 7);
    // Calculate inside value (perfect square)
    const finalInside = finalResult * finalResult;
    // Choose coefficient between 2 and 12
    const finalCoeff = getRandomInt(2, 12);
    // Calculate x so that coeff*x + 1 = inside
    const finalX = (finalInside - 1) / finalCoeff;

    // Ensure finalX is a reasonable integer
    if (!Number.isInteger(finalX) || finalX < 2 || finalX > 15) {
      // Fallback: pick values that work
      const validCombos = [
        {result: 3, coeff: 2, x: 4},  // sqrt(2*4+1) = sqrt(9) = 3
        {result: 4, coeff: 3, x: 5},  // sqrt(3*5+1) = sqrt(16) = 4
        {result: 5, coeff: 2, x: 12}, // sqrt(2*12+1) = sqrt(25) = 5
        {result: 5, coeff: 4, x: 6},  // sqrt(4*6+1) = sqrt(25) = 5
        {result: 5, coeff: 8, x: 3},  // sqrt(8*3+1) = sqrt(25) = 5
        {result: 6, coeff: 5, x: 7},  // sqrt(5*7+1) = sqrt(36) = 6
      ];
      const combo = getRandomElement(validCombos);
      return generateWithValues(combo.result, combo.coeff, combo.x);
    }

    return generateWithValues(finalResult, finalCoeff, finalX);
  }
};

function generateWithValues(finalResult: number, finalCoeff: number, finalX: number): QuestionData {
  const finalInside = finalResult * finalResult;

  const optionsData = [
    { text: `$${finalResult}$`, isCorrect: true },
    { text: `$${finalInside}$`, isCorrect: false },
    { text: `$\\frac{${finalResult}}{${finalCoeff}}$`, isCorrect: false },
    { text: `$${finalCoeff * finalX}$`, isCorrect: false }
  ];

  const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

  const correctOption = shuffled.find(o => o.isCorrect)!;

  return {
    questionText: `The function $g$ is defined by $g(x) = \\sqrt{${finalCoeff}x + 1}$. What is the value of $g(${finalX})$?`,
    figureCode: null,
    options: shuffled.map(o => o.text),
    correctAnswer: finalResult.toString(),
    explanation: `Choice ${correctOption.letter} is correct. Substitute $${finalX}$ for $x$ in the function: $g(${finalX}) = \\sqrt{${finalCoeff}(${finalX}) + 1}$. This simplifies to $\sqrt{${finalInside}}$, which is $${finalResult}$.`
  };
}

/**
 * Question ID: cc2601cb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [root: 4-10]
 * - Difficulty factors: [Identifying x-intercept from a vertex-form parabola]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Vertex must be on the x-axis]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */
