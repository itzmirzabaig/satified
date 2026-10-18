import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 193
 *
 * ORIGINAL ANALYSIS: [Equation from integer table pattern]
 * - Number ranges: [slope: 1-4, intercept: 2-10]
 * - Difficulty factors: [Identifying equation from table]
 * - Constraints: [Simple integers for Easy]
 *
 * FIX NOTES:
 * Choices were built as raw templates, so draws showed "y = 1x + 9",
 * "y = 5x - -1" and "y = 5x - 0"; one distractor was (m + 2, b - 5), labeled
 * "incorrect values". Choices now go through a line formatter, that
 * distractor uses the y-value at x = 1 as the intercept, the swapped choice
 * never equals the answer, and every wrong choice is explained.
 */

export const generator_193 = {
  metadata: {
    id: "193",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (1-4) and y-intercept (2-10); m !== b so the swapped
    // choice differs from the correct one.
    let m = 1, b = 2;
    do {
      m = getRandomInt(1, 4);
      b = getRandomInt(2, 10);
    } while (m === b);
    // "y = mx + b" with a bare x for a slope of 1 and no constant term for 0.
    const line = (slope: number, icpt: number) =>
      `$y = ${slope === 1 ? '' : slope}x${icpt === 0 ? '' : icpt > 0 ? ` + ${icpt}` : ` - ${-icpt}`}$`;
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);

    const tableCode = `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${yVals[i]}</td></tr>`).join('')}</table>`;

    // Distinct: (b, m) differs from (m, b) since m !== b; (m, m + b) has a
    // larger intercept than b; (m + b, 0) has intercept 0 while b >= 2.
    const correctText = line(m, b);
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: line(b, m), isCorrect: false, reason: `it swaps the slope, ${m}, and the $y$-intercept, ${b}` },
      { text: line(m, m + b), isCorrect: false, reason: `it uses the value of $y$ when $x = 1$, ${m + b}, as the $y$-intercept instead of the value of $y$ when $x = 0$` },
      { text: line(m + b, 0), isCorrect: false, reason: `it uses the value of $y$ when $x = 1$, ${m + b}, as the slope and has no $y$-intercept; it gives $y = ${2 * (m + b)}$ when $x = 2$, not ${yVals[2]}` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which equation represents the relationship between $x$ and $y$ shown in the table?`,
      figureCode: tableCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. When $x = 0$, $y = ${b}$, so the $y$-intercept is ${b}. Each time $x$ increases by 1, $y$ increases by ${m}, so the slope is ${m}. Therefore, the equation is ${correctText}. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
