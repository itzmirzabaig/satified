import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1fe778dc
 *
 * ORIGINAL ANALYSIS: [Negative fractional slope equation]
 * - Number ranges: [numerator: 1-2, denominator: 2-5, intercept: 2-8]
 * - Difficulty factors: [Working with negative fractional slopes]
 * - Constraints: [Simple fractions for Easy]
 */

export const generator_1fe778dc = {
  metadata: {
    // id: "1fe778dc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope components
    const num = getRandomInt(1, 2);
    const den = getRandomInt(2, 5);
    // Randomize y-intercept (2-8)
    const b = getRandomInt(2, 8);

    const optionsData = [
      { text: `$y = -\\frac{${num}}{${den}}x + ${b}$`, isCorrect: true },
      { text: `$y = -\\frac{${num}}{${den}}x - ${b}$`, isCorrect: false, reason: "wrong intercept sign" },
      { text: `$y = \\frac{${num}}{${den}}x - ${b}$`, isCorrect: false, reason: "wrong signs" },
      { text: `$y = \\frac{${num}}{${den}}x + ${b}$`, isCorrect: false, reason: "wrong slope sign" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A line has slope $-\\frac{${num}}{${den}}$ and passes through $(0, ${b})$. Which is the equation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$y = -\\frac{${num}}{${den}}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. The slope-intercept form is $y = mx + b$ where $m = -\\frac{${num}}{${den}}$ and $b = ${b}$.`
    };
  }
};

/**
 * Question ID: 39617468
 *
 * ORIGINAL ANALYSIS: [Birch and maple tree substitution]
 */
