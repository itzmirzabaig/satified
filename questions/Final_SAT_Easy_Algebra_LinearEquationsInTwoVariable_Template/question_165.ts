import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 165
 *
 * ORIGINAL ANALYSIS: [Table values for large slope equation]
 * - Number ranges: [slope: 40-90, intercept: 5-15]
 * - Difficulty factors: [Matching table to linear equation]
 * - Constraints: [Values should be reasonable for Easy]
 */

export const generator_165 = {
  metadata: {
    id: "165",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const xVals = [0, 1, 2];

    // Build a data table straight from an explicit y-column so that no two
    // options can ever share the same displayed data (never string-replace on
    // already-rendered HTML — that corrupts style bytes and can duplicate data).
    const buildTable = (ys: number[]): string =>
      `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals
        .map(
          (x, i) =>
            `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${ys[i]}</td></tr>`
        )
        .join('')}</table>`;

    const eq = (a: number[], b: number[]) => a.every((v, i) => v === b[i]);

    let m = 0;
    let b = 0;
    let correctY: number[] = [];
    let wrongZeroIntercept: number[] = [];
    let wrongHalfSlope: number[] = [];
    let wrongLowerSlope: number[] = [];
    let tries = 0;
    do {
      // Randomize slope (40-90 for Easy) and y-intercept (5-15)
      m = getRandomInt(40, 90);
      b = getRandomInt(5, 15);
      correctY = xVals.map(x => m * x + b);              // y = mx + b
      wrongZeroIntercept = xVals.map(x => m * x);        // forgot the intercept
      wrongHalfSlope = xVals.map(x => Math.round(m * 0.5) * x + b); // halved slope
      wrongLowerSlope = xVals.map(x => (m - 10) * x + b); // slope off by 10
    } while (
      tries++ < 50 &&
      // Every option must show a DIFFERENT y-column than every other option.
      (eq(correctY, wrongZeroIntercept) ||
        eq(correctY, wrongHalfSlope) ||
        eq(correctY, wrongLowerSlope) ||
        eq(wrongZeroIntercept, wrongHalfSlope) ||
        eq(wrongZeroIntercept, wrongLowerSlope) ||
        eq(wrongHalfSlope, wrongLowerSlope))
    );

    const optionsData = [
      { text: "Table A", code: buildTable(correctY), isCorrect: true },
      { text: "Table B", code: buildTable(wrongHalfSlope), isCorrect: false, reason: "slope halved" },
      { text: "Table C", code: buildTable(wrongZeroIntercept), isCorrect: false, reason: "zero intercept" },
      { text: "Table D", code: buildTable(wrongLowerSlope), isCorrect: false, reason: "slope off by 10" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which table matches $y = ${m}x + ${b}$?`,
      figureCode: null,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${correctLetter} is correct. When $x=0$, $y=${b}$ (the y-intercept), and when $x=2$, $y=${correctY[2]}$.`
    };
  }
};
