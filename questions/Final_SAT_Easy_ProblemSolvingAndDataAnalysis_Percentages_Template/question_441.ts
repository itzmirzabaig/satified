import { getRandomInt, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 441
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table data with specific values, 1-star calls: 16, total: 145]
 * - Difficulty factors: [Table reading, fraction to percentage, rounding]
 * - Distractor patterns: [3% = 16/grandTotal, 16% = raw number, complement = miscalculation]
 * - Constraints: [Must round to nearest whole percent]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_441 = {
  metadata: {
    id: "441",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Fixed cells for every employee/rating so the whole table stays internally
    // consistent. Only Employee A's 1-star count is randomized; all totals are
    // computed from the cells below, so every row/column/grand total adds up.
    const a2 = 55, a3 = 48, a4 = 17;          // Employee A: 2,3,4-star (sum 120)
    const b = [4, 10, 22, 34];                 // Employee B row (total 70)
    const c = [8, 56, 45, 16];                 // Employee C row (total 125)
    const d = [22, 42, 84, 12];                // Employee D row (total 160)

    // Bounded retry: keep the four answer choices distinct for every draw.
    let star1 = 0, roundedPercent = 0, distractorA = 0, distractorC = 0, distractorD = 0;
    let rowTotalA = 0, grandTotal = 0, percentage = 0;
    let tries = 0;
    do {
      star1 = getRandomInt(12, 28);
      rowTotalA = star1 + a2 + a3 + a4;
      grandTotal = rowTotalA + 70 + 125 + 160;
      percentage = (star1 / rowTotalA) * 100;
      roundedPercent = Math.round(percentage);
      distractorA = Math.round((star1 / grandTotal) * 100);           // divided by grand total
      distractorC = star1;                                             // raw count, not a percent
      distractorD = Math.round(((rowTotalA - star1) / rowTotalA) * 100); // percent NOT rated 1 star
      tries++;
    } while (
      tries < 50 &&
      new Set([roundedPercent, distractorA, distractorC, distractorD]).size < 4
    );

    // Column and grand totals derived from the live cells.
    const col1 = star1 + b[0] + c[0] + d[0];
    const col2 = a2 + b[1] + c[1] + d[1];
    const col3 = a3 + b[2] + c[2] + d[2];
    const col4 = a4 + b[3] + c[3] + d[3];
    const totB = b[0] + b[1] + b[2] + b[3];
    const totC = c[0] + c[1] + c[2] + c[3];
    const totD = d[0] + d[1] + d[2] + d[3];

    const tableCode = `
<table>
  <thead>
    <tr>
      <th>Employee</th>
      <th>1 star</th>
      <th>2 stars</th>
      <th>3 stars</th>
      <th>4 stars</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Employee A</td><td>${star1}</td><td>${a2}</td><td>${a3}</td><td>${a4}</td><td>${rowTotalA}</td></tr>
    <tr><td>Employee B</td><td>${b[0]}</td><td>${b[1]}</td><td>${b[2]}</td><td>${b[3]}</td><td>${totB}</td></tr>
    <tr><td>Employee C</td><td>${c[0]}</td><td>${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td>${totC}</td></tr>
    <tr><td>Employee D</td><td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${totD}</td></tr>
    <tr><td>Total</td><td>${col1}</td><td>${col2}</td><td>${col3}</td><td>${col4}</td><td>${grandTotal}</td></tr>
  </tbody>
</table>`;

    const optionsData = [
      { text: `${distractorA}%`, isCorrect: false, reason: `${distractorA}% results from dividing Employee A's ${star1} calls rated 1 star by the total number of calls for all four employees, ${grandTotal}, instead of by Employee A's total, ${rowTotalA}` },
      { text: `${roundedPercent}%`, isCorrect: true, reason: '' },
      { text: `${distractorC}%`, isCorrect: false, reason: `${star1} is the number of Employee A's calls rated 1 star, not the percent of Employee A's calls` },
      { text: `${distractorD}%`, isCorrect: false, reason: `${distractorD}% is the percent of Employee A's calls that did not receive a rating of 1 star` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A supervisor at a call center reviewed the ${grandTotal} calls taken by four employees and rated each call on a scale from 1 star to 4 stars. The table shows the ratings for each employee. According to the table, to the nearest whole percent, what percent of Employee A's calls received a rating of 1 star?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${roundedPercent}%`,
      explanation: `Choice ${correctOption.letter} is correct. The table shows that Employee A took ${rowTotalA} calls, and ${star1} of them were rated 1 star. To find the percent, divide ${star1} by ${rowTotalA} and multiply by 100: $\\frac{${star1}}{${rowTotalA}} \\times 100 \\approx ${round(percentage, 2)}$, which rounds to ${roundedPercent}% to the nearest whole percent. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
