import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 790
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x bound: 22, y < x relationship]
 * - Difficulty factors: [System verification with table, two constraints]
 * - Distractor patterns: [B=fails y<x, C=fails x<bound, D=fails both]
 * - Constraints: [Every (x,y) row of the correct table satisfies y < x AND x < bound]
 * - Question type: [Table -> Multiple Choice (figure options)]
 * - Figure generation: [HTML tables live in the options]
 *
 * The options are HTML tables, so the correct answer is returned as the numeric
 * index of the correct (shuffled) option (see question_772 for the same pattern).
 * No pre-baked "Table A/B/C/D" label is placed in the option text, because the
 * choice letter is only known after shuffling.
 */

export const generator_790 = {
  metadata: {
    id: "790",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Random bound and three ascending x-values, all strictly below it.
    // xBound in [18, 30]; x-values are xBound-3, xBound-2, xBound-1, so each is
    // < xBound with room to spare.
    const xBound = getRandomInt(18, 30);
    const x1 = xBound - 3;
    const x2 = xBound - 2;
    const x3 = xBound - 1;

    // STEP 2: Correct table. y = x - d with d in [1,3] guarantees y < x for
    // every row, and every x is already < xBound. Both constraints hold.
    const yCorrect1 = x1 - getRandomInt(1, 3);
    const yCorrect2 = x2 - getRandomInt(1, 3);
    const yCorrect3 = x3 - getRandomInt(1, 3);

    // STEP 3: Distractor B fails y < x. Keep x < xBound (so the ONLY failure is
    // the y < x constraint) but make the middle row have y > x.
    const yB1 = x1 - getRandomInt(1, 3);
    const yB2 = x2 + getRandomInt(1, 3); // y > x -> violates y < x
    const yB3 = x3 - getRandomInt(1, 3);

    // STEP 4: Distractor C fails x < xBound. Every y < x still holds, but the
    // third x-value sits at/above the bound.
    const xC3 = xBound + getRandomInt(0, 3); // >= xBound -> violates x < xBound
    const yC1 = x1 - getRandomInt(1, 3);
    const yC2 = x2 - getRandomInt(1, 3);
    const yC3 = xC3 - getRandomInt(1, 3);

    // STEP 5: Distractor D fails both. Third x-value above the bound AND its y
    // exceeds its x.
    const xD3 = xBound + getRandomInt(1, 4); // > xBound
    const yD1 = x1 - getRandomInt(1, 3);
    const yD2 = x2 - getRandomInt(1, 3);
    const yD3 = xD3 + getRandomInt(1, 3); // y > x too

    // STEP 6: Table builder (plain HTML string, currentColor strokes).
    const buildTable = (
      rx1: number, ry1: number,
      rx2: number, ry2: number,
      rx3: number, ry3: number
    ) =>
      `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">y</th></tr></thead><tbody>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${rx1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${ry1}</td></tr>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${rx2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${ry2}</td></tr>` +
      `<tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${rx3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${ry3}</td></tr>` +
      `</tbody></table>`;

    const optionsData = [
      { text: buildTable(x1, yCorrect1, x2, yCorrect2, x3, yCorrect3), isCorrect: true },
      { text: buildTable(x1, yB1, x2, yB2, x3, yB3), isCorrect: false },
      { text: buildTable(x1, yC1, x2, yC2, xC3, yC3), isCorrect: false },
      { text: buildTable(x1, yD1, x2, yD2, xD3, yD3), isCorrect: false }
    ];

    // STEP 7: Shuffle and assign display letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctIndex = shuffledOptions.findIndex(o => o.isCorrect);
    const correctOption = shuffledOptions[correctIndex];

    // STEP 8: Explanation from live values; letter from shuffled array.
    const explanation = `Choice ${correctOption.letter} is correct. The point $(x, y)$ must satisfy both $y < x$ and $x < ${xBound}$. In the table for choice ${correctOption.letter}, each $x$-value (${x1}, ${x2}, ${x3}) is less than ${xBound}, and each $y$-value is less than its $x$-value: ${yCorrect1} < ${x1}, ${yCorrect2} < ${x2}, and ${yCorrect3} < ${x3}. The other tables each break at least one condition: one has a row where $y > x$, one has an $x$-value that is not less than ${xBound}, and one fails both.`;

    // STEP 9: Return. correctAnswer is the numeric index of the correct option
    // because the options are figures (HTML tables), not short text.
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given system of inequalities? $y < x$ and $x < ${xBound}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctIndex,
      explanation: explanation
    };
  }
};
