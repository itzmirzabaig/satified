import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 456
 * FIXED:
 * - Added a visual HTML table to `figureCode` to display the numbers.
 * - Shuffled the display order of numbers in the table.
 * - Used `currentColor` for table borders to support light/dark mode.
 * - The data set now has 3 to 6 numbers with 1 or more negatives, so the
 *   answer varies (it was always 1/3). Wrong choices are the probability of
 *   a positive number, the ratio of negatives to positives, and 1 over the
 *   number of values. Their reasons refer to this data set.
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (p: number, q: number): string => {
  const g = gcd(p, q);
  return q / g === 1 ? `${p / g}` : `\\frac{${p / g}}{${q / g}}`;
};

export const generator_456 = {
  metadata: {
    id: "456",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // 1. Generate Data: n numbers, k of them negative, all different.
    // Redraw until the four choices have different values.
    let n = 0, k = 0;
    let pool: { text: string; v: number; reason: string }[] = [];
    do {
      n = getRandomInt(3, 6);
      k = getRandomInt(1, n - 1);
      pool = [
        { text: frac(n - k, n), v: (n - k) / n, reason: `$${frac(n - k, n)}$ is the probability of selecting a positive number, since ${n - k} of the ${n} numbers are positive` },
        { text: frac(k, n - k), v: k / (n - k), reason: `$${frac(k, n - k)}$ is the ratio of the number of negative numbers, ${k}, to the number of positive numbers, ${n - k}; the denominator must be the total number of values, ${n}` },
        { text: frac(1, n), v: 1 / n, reason: `$${frac(1, n)}$ is the probability of selecting any one particular number from the data set, not the probability of selecting a negative number` }
      ];
    } while (new Set([k / n, ...pool.map(o => o.v)].map(v => v.toFixed(6))).size < 4);

    const negatives = shuffle([...Array(26).keys()].map(i => -(i + 5))).slice(0, k);
    const positives = shuffle([...Array(26).keys()].map(i => i + 5)).slice(0, n - k);
    const dataSet = shuffle([...negatives, ...positives]);

    // 2. Create Figure (HTML Table). Negative numbers use a true minus sign.
    const tableHtml = `
      <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
        <table style="border-collapse: collapse; font-family: sans-serif; font-size: 1.2rem;">
          <tr>
            ${dataSet.map(num => `
              <td style="border: 1px solid currentColor; padding: 12px 20px; text-align: center;">
                ${num < 0 ? `&minus;${-num}` : num}
              </td>
            `).join('')}
          </tr>
        </table>
      </div>
    `;

    const correctText = frac(k, n);
    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      ...pool.map(o => ({ text: o.text, isCorrect: false, reason: o.reason }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const words = ['', 'one', 'two', 'three', 'four', 'five', 'six'];
    const negList = dataSet.filter(x => x < 0).map(x => `$${x}$`);
    const negPhrase = k === 1 ? `Only ${negList[0]} is negative` : `${k} of them, ${negList.slice(0, -1).join(', ')}${k > 2 ? ',' : ''} and ${negList[k - 1]}, are negative`;

    return {
      questionText: `The table shows a data set of ${words[n]} numbers. If a number from this data set is selected at random, what is the probability of selecting a negative number?`,
      figureCode: tableHtml,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The data set contains ${words[n]} numbers, and ${negPhrase}. So the probability of selecting a negative number is $\\frac{${k}}{${n}}$${gcd(k, n) > 1 ? `, or $${correctText}$` : ''}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
