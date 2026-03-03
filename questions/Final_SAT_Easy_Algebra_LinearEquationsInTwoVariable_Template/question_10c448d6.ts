import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 10c448d6
 *
 * ORIGINAL ANALYSIS: [Line with fractional slope]
 * - Number ranges: [numerator: 1-3, denominator: 5-12, y-intercept: 5-20]
 * - Difficulty factors: [Working with fractional slopes]
 * - Constraints: [Slope should be simple fraction for Easy]
 */

export const generator_10c448d6 = {
  metadata: {
    // id: "10c448d6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope components for Easy difficulty
    const numerator = getRandomInt(1, 3);
    const denominator = getRandomInt(5, 12);
    // Randomize y-intercept (5-20)
    const b = getRandomInt(5, 20);

    const optionsData = [
      { text: `$y = \\frac{${numerator}}{${denominator}}x + ${b}$`, isCorrect: true },
      { text: `$y = -\\frac{${numerator}}{${denominator}}x + ${b}$`, isCorrect: false, reason: "wrong slope sign" },
      { text: `$y = \\frac{${numerator}}{${denominator}}x - ${b}$`, isCorrect: false, reason: "wrong intercept sign" },
      { text: `$y = -\\frac{${numerator}}{${denominator}}x - ${b}$`, isCorrect: false, reason: "wrong signs" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A line has slope $\\frac{${numerator}}{${denominator}}$ and passes through $(0, ${b})$. Which is its equation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$y = \\frac{${numerator}}{${denominator}}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. The slope-intercept form is $y = mx + b$ where $m = \\frac{${numerator}}{${denominator}}$ and $b = ${b}$.`
    };
  }
};

/**
 * Question ID: 7038b587
 *
 * ORIGINAL ANALYSIS: [Party hats and cupcakes cost]
 */
