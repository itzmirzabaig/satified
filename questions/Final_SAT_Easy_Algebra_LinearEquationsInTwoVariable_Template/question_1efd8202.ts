import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1efd8202
 *
 * ORIGINAL ANALYSIS: [Table values for large slope equation]
 * - Number ranges: [slope: 40-90, intercept: 5-15]
 * - Difficulty factors: [Matching table to linear equation]
 * - Constraints: [Values should be reasonable for Easy]
 */

export const generator_1efd8202 = {
  metadata: {
    // id: "1efd8202",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (40-90 for Easy)
    const m = getRandomInt(40, 90);
    // Randomize y-intercept (5-15)
    const b = getRandomInt(5, 15);
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);

    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${yVals[i]}</td></tr>`).join('')}</table>`;

    const wrongY1 = xVals.map(x => Math.round(m * 0.5) * x + b);
    const wrongY2 = xVals.map(x => m * x);
    const wrongY3 = xVals.map(x => (m - 10) * x + b);

    const optionsData = [
      { text: "Table A", code: tableCode, isCorrect: true },
      { text: "Table B", code: tableCode.replace(yVals[2].toString(), wrongY1[2].toString()), isCorrect: false, reason: "wrong values" },
      { text: "Table C", code: tableCode.replace(yVals[0].toString(), "0"), isCorrect: false, reason: "zero intercept" },
      { text: "Table D", code: tableCode.replace(yVals[2].toString(), wrongY3[2].toString()), isCorrect: false, reason: "wrong values" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which table matches $y = ${m}x + ${b}$?`,
      figureCode: null,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${correctLetter} is correct. When $x=0$, $y=${b}$ (y-intercept), and when $x=2$, $y=${yVals[2]}$.`
    };
  }
};

/**
 * Question ID: ed856e9c
 *
 * ORIGINAL ANALYSIS: [Y-intercept point ID]
 */
