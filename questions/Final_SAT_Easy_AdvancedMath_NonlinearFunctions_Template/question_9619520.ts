import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9619520
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20000-30000, rate: 0.8-0.9]
 * - Difficulty factors: [Reading values from a table for an exponential model]
 * - Distractor patterns: [Value at 1 year, value at 2 years, random vehicle value]
 * - Constraints: [Values follow exponential decay]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_9619520 = {
  metadata: {
    // id: "9619520",
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

    const tableHTML = `<table border="1">
  <tr><th>Years after purchase</th><th>Value (dollars)</th></tr>
  ${years.map((y, i) => `<tr><td>${y}</td><td>$${values[i].toLocaleString()}</td></tr>`).join('')}
</table>`;

    const optionsData = [
      { text: `$${targetVal.toLocaleString()}`, isCorrect: true },
      { text: `$${year1Val.toLocaleString()}`, isCorrect: false },
      { text: `$${year2Val.toLocaleString()}`, isCorrect: false },
      { text: `$${Math.round(initial * 0.5).toLocaleString()}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `Which of the following is closest to the predicted value of the sport utility vehicle 3 years after it is first purchased?`,
      figureCode: tableHTML,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${targetVal.toLocaleString()}`,
      explanation: `Choice ${correctOption.letter} is correct. Looking at the table, 3 years after purchase ($x=3$), the value is $${targetVal.toLocaleString()}$.`
    };
  }
};

/**
 * Question ID: c1eead73
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: -20 to 20, xInput: 2-10]
 * - Difficulty factors: [Substitution and evaluation of an absolute value function]
 * - Distractor patterns: [Negative result, result before abs, result from opposite shift]
 * - Constraints: [Calculation must follow absolute value rule]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */