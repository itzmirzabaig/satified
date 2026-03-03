import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b2de69bd
 *
 * ORIGINAL ANALYSIS: [Equation from integer table pattern]
 * - Number ranges: [slope: 1-4, intercept: 2-10]
 * - Difficulty factors: [Identifying equation from table]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_b2de69bd = {
  metadata: {
    // id: "b2de69bd",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (1-4)
    const m = getRandomInt(1, 4);
    // Randomize y-intercept (2-10)
    const b = getRandomInt(2, 10);
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);

    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${yVals[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: `$y = ${m}x + ${b}$`, isCorrect: true },
      { text: `$y = ${b}x - ${m}$`, isCorrect: false, reason: "swaps m and b" },
      { text: `$y = ${m + 2}x - ${b - 5}$`, isCorrect: false, reason: "incorrect values" },
      { text: `$y = ${m + b}x$`, isCorrect: false, reason: "zero intercept" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which equation represents the table?`,
      figureCode: tableCode,
      options: shuffled.map(o => o.text),
      correctAnswer: `$y = ${m}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. The slope is $(${yVals[2]}-${yVals[1]})/(2-1) = ${m}$ and the y-intercept is ${b}.`
    };
  }
};

/**
 * Question ID: 5518885d
 *
 * ORIGINAL ANALYSIS: [Daylight subtraction]
 */
