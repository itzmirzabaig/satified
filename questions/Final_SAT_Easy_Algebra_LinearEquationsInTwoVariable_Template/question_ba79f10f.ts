import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ba79f10f
 *
 * ORIGINAL ANALYSIS: [Equation from table points]
 * - Number ranges: [slope: -6 to -2, intercept: 10-25]
 * - Difficulty factors: [Identifying equation from table with negative slope]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_ba79f10f = {
  metadata: {
    // id: "ba79f10f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (-6 to -2)
    const m = -getRandomInt(2, 6);
    // Randomize y-intercept (10-25)
    const b = getRandomInt(10, 25);
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);

    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${yVals[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: `$y = ${m}x + ${b}$`, isCorrect: true },
      { text: `$y = ${b}x + ${Math.abs(m)}$`, isCorrect: false, reason: "swaps m and b" },
      { text: `$y = ${b}x + ${b}$`, isCorrect: false, reason: "uses b for both" },
      { text: `$y = ${m}x + ${b - 5}$`, isCorrect: false, reason: "uses wrong intercept" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which equation represents the linear relationship in the table?`,
      figureCode: tableCode,
      options: shuffled.map(o => o.text),
      correctAnswer: `$y = ${m}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. The table shows y-intercept $(0, ${b})$ and slope ${m}.`
    };
  }
};

/**
 * Question ID: dfa45424
 *
 * ORIGINAL ANALYSIS: [10-ride pass cost equation]
 */
