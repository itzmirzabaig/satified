import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 83
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20000-30000, rate: 0.8-0.9]
 * - Difficulty factors: [Reading values from a table for an exponential model]
 * - Distractor patterns: [Value at 1 year, value at 2 years, random vehicle value]
 * - Constraints: [Values follow exponential decay]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 *
 * FIXED:
 * - TEX_UNBALANCED / DOLLAR_RISK: options, explanation, and table cells used
 *   bare "$" for currency. Options/explanation now use escaped "\$"; the
 *   table cells show plain numbers (the header already says "dollars").
 * - questionText referenced "the sport utility vehicle" with no introduction;
 *   added a sentence introducing the table.
 * - Explanation now covers every distractor with letters taken from the
 *   shuffled array.
 * - Distractor distinctness holds for every draw: with rate in [0.80, 0.90],
 *   value gaps are >= initial*rate*(1-rate) >= 1800 between consecutive years,
 *   and |initial*(rate^3 - 0.5)| >= 240 for the half-price distractor.
 */

export const generator_83 = {
  metadata: {
    id: "83",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(20, 30) * 1000;
    const rate = getRandomInt(80, 90) / 100;
    const years = [0, 1, 2, 3];
    const values = years.map(y => Math.round(initial * Math.pow(rate, y)));

    // Target is the value at year 3 (index 3)
    const targetVal = values[3];
    const year1Val = values[1];
    const year2Val = values[2];
    const halfVal = Math.round(initial * 0.5);

    const cellStyle = 'border: 1px solid currentColor; padding: 6px 14px; text-align: center;';
    const tableHTML = `<table style="border-collapse: collapse; margin: 0 auto; font-size: 15px;">
  <tr><th style="${cellStyle}">Years after purchase</th><th style="${cellStyle}">Predicted value (dollars)</th></tr>
  ${years.map((y, i) => `<tr><td style="${cellStyle}">${y}</td><td style="${cellStyle}">${values[i].toLocaleString('en-US')}</td></tr>`).join('\n  ')}
</table>`;

    const optionsData = [
      {
        text: `\\$${targetVal.toLocaleString('en-US')}`,
        isCorrect: true,
        reason: ""
      },
      {
        text: `\\$${year1Val.toLocaleString('en-US')}`,
        isCorrect: false,
        reason: "this is the predicted value of the vehicle 1 year after purchase, not 3 years"
      },
      {
        text: `\\$${year2Val.toLocaleString('en-US')}`,
        isCorrect: false,
        reason: "this is the predicted value of the vehicle 2 years after purchase, not 3 years"
      },
      {
        text: `\\$${halfVal.toLocaleString('en-US')}`,
        isCorrect: false,
        reason: "this is half of the original purchase price, which does not appear in the table"
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `A sport utility vehicle begins to decrease in value as soon as it is purchased. The table gives the predicted value of the vehicle, in dollars, for each of the first 3 years after it is purchased. According to the table, what is the predicted value of the vehicle 3 years after it is purchased?`,
      figureCode: tableHTML,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In the table, the row where the number of years after purchase is 3 shows a predicted value of \\$${targetVal.toLocaleString('en-US')}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
