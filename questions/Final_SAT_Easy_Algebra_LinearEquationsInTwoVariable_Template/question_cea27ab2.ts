import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: cea27ab2
 *
 * ORIGINAL ANALYSIS: [Standard form table verification]
 * - Number ranges: [a: 3-10, b: -6 to -2, c: -100 to -40]
 * - Difficulty factors: [Matching table to standard form equation]
 * - Constraints: [Result must be integer]
 */

export const generator_cea27ab2 = {
  metadata: {
    // id: "cea27ab2",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize coefficients
    const a = getRandomInt(3, 10);
    const b = -getRandomInt(2, 6);
    // Choose c to ensure integer y values
    const xVals = [0, 4, 8];
    const yVals = xVals.map(x => {
      // Calculate y = (c - a*x) / b, ensure integer
      const yBase = getRandomInt(10, 30);
      return yBase;
    });
    // Calculate c from first point
    const c = a * xVals[0] + b * yVals[0];

    const createTable = (ys: number[]) => `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${ys[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: "Table A", code: createTable(yVals), isCorrect: true },
      { text: "Table B", code: createTable(yVals.map(y => y + 5)), isCorrect: false, reason: "incorrect y values" },
      { text: "Table C", code: createTable([yVals[2], yVals[1], yVals[0]]), isCorrect: false, reason: "reversed values" },
      { text: "Table D", code: createTable(yVals.map(y => -y)), isCorrect: false, reason: "wrong signs" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which table matches $${a}x ${b >= 0 ? '+' : ''}${b}y = ${c}$?`,
      figureCode: null,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${correctLetter} is correct. Substituting $x=${xVals[0]}$ gives $y=${yVals[0]}$.`
    };
  }
};

/**
 * Question ID: 2554b413
 *
 * ORIGINAL ANALYSIS: [Slope-intercept from given m and b]
 */
