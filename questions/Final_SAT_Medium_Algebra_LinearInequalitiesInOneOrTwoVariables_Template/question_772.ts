import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 772
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 7, intercept: -4, x values: 3,5,8]
 * - Difficulty factors: [Table verification, strict inequality y > mx + b]
 * - Distractor patterns: [Tables with some points satisfying, some not]
 * - Constraints: [Correct table must satisfy y > mx + b for ALL points; each
 *   distractor must fail at exactly one point]
 * - Question type: [Table -> Multiple Choice Text]
 * - Figure generation: [HTML table inside each option]
 */

export const generator_772 = {
  metadata: {
    id: "772",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate the inequality y > slope*x + intercept (intercept < 0).
    const slope = getRandomInt(4, 9);
    const intercept = -getRandomInt(1, 6);
    const absIntercept = Math.abs(intercept);

    // STEP 2: Three increasing x values.
    const x1 = getRandomInt(2, 4);
    const x2 = x1 + getRandomInt(2, 3);
    const x3 = x2 + getRandomInt(2, 4);

    // Boundary y-value at each x.
    const t1 = slope * x1 + intercept;
    const t2 = slope * x2 + intercept;
    const t3 = slope * x3 + intercept;

    // STEP 3: y-values per table.
    // Correct table: every y strictly greater than its boundary.
    const yCorrect1 = t1 + getRandomInt(2, 6);
    const yCorrect2 = t2 + getRandomInt(2, 6);
    const yCorrect3 = t3 + getRandomInt(2, 6);

    // Distractor 1: fails at the first point (y below boundary).
    const yA1 = t1 - getRandomInt(1, 3);
    const yA2 = t2 + getRandomInt(1, 3);
    const yA3 = t3 + getRandomInt(1, 3);

    // Distractor 2: fails at the third point.
    const yB1 = t1 + getRandomInt(1, 3);
    const yB2 = t2 + getRandomInt(1, 3);
    const yB3 = t3 - getRandomInt(1, 3);

    // Distractor 3: fails at the second point.
    const yC1 = t1 + getRandomInt(2, 6);
    const yC2 = t2 - getRandomInt(1, 3);
    const yC3 = t3 + getRandomInt(2, 6);

    // STEP 4: Table builder.
    const cellTh = 'border: 1px solid currentColor; padding: 8px;';
    const cellTd = 'border: 1px solid currentColor; padding: 8px; text-align: center;';
    const buildTable = (ya: number, yb: number, yc: number) =>
      `<table style="border-collapse: collapse; margin: 10px auto;"><thead><tr>` +
      `<th style="${cellTh}">x</th><th style="${cellTh}">y</th></tr></thead><tbody>` +
      `<tr><td style="${cellTd}">${x1}</td><td style="${cellTd}">${ya}</td></tr>` +
      `<tr><td style="${cellTd}">${x2}</td><td style="${cellTd}">${yb}</td></tr>` +
      `<tr><td style="${cellTd}">${x3}</td><td style="${cellTd}">${yc}</td></tr>` +
      `</tbody></table>`;

    // STEP 5: Options (only the correct table satisfies every row).
    const optionsData = [
      { text: buildTable(yA1, yA2, yA3), isCorrect: false },
      { text: buildTable(yB1, yB2, yB3), isCorrect: false },
      { text: buildTable(yC1, yC2, yC3), isCorrect: false },
      { text: buildTable(yCorrect1, yCorrect2, yCorrect3), isCorrect: true },
    ];

    // STEP 6: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctIndex = shuffledOptions.findIndex(o => o.isCorrect);
    const correctOption = shuffledOptions[correctIndex];

    // STEP 7: Explanation (all values live; math spans balanced; no math span
    // begins with a digit, so there is no currency-collision risk).
    const explanation = `Choice ${correctOption.letter} is correct. Each row must satisfy $y > ${slope}x - ${absIntercept}$. At $x = ${x1}$ the boundary value is ${t1}, at $x = ${x2}$ it is ${t2}, and at $x = ${x3}$ it is ${t3}. Only the table in choice ${correctOption.letter} has every $y$ strictly greater than its boundary: the values ${yCorrect1}, ${yCorrect2}, and ${yCorrect3} exceed ${t1}, ${t2}, and ${t3}, respectively. Each of the other tables has at least one row whose $y$ is not greater than the boundary, so those points are not solutions.`;

    // STEP 8: Return question data. correctAnswer is the index of the correct
    // (shuffled) option, since the options are figures rather than short text.
    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality $y > ${slope}x - ${absIntercept}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctIndex,
      explanation: explanation
    };
  }
};
