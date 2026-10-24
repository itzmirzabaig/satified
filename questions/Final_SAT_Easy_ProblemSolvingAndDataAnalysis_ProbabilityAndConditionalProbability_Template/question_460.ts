import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 460
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-11, -9, 26 - small integers]
 * - Difficulty factors: [Data set table, counting positive numbers]
 * - Question type: [Data Table → HTML Table]
 *
 * FIXED: the data set now has 3 to 6 numbers with 1 or more positives, so
 * the answer varies (it was always 1/3, with the positive number always
 * last). Wrong choices are the probability of a negative number, the ratio
 * of positives to negatives, and 1 over the number of values; their reasons
 * refer to this data set (two used to describe other data sets).
 */

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (p: number, q: number): string => {
  const g = gcd(p, q);
  return q / g === 1 ? `${p / g}` : `\\frac{${p / g}}{${q / g}}`;
};

export const generator_460 = {
  metadata: {
    id: "460",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // n numbers, k of them positive, all different. Redraw until the four
    // choices have different values.
    let n = 0, k = 0;
    let pool: { text: string; v: number; reason: string }[] = [];
    do {
      n = getRandomInt(3, 6);
      k = getRandomInt(1, n - 1);
      pool = [
        { text: frac(n - k, n), v: (n - k) / n, reason: `$${frac(n - k, n)}$ is the probability of selecting a negative number, since ${n - k} of the ${n} numbers are negative` },
        { text: frac(k, n - k), v: k / (n - k), reason: `$${frac(k, n - k)}$ is the ratio of the number of positive numbers, ${k}, to the number of negative numbers, ${n - k}; the denominator must be the total number of values, ${n}` },
        { text: frac(1, n), v: 1 / n, reason: `$${frac(1, n)}$ is the probability of selecting any one particular number from the data set, not the probability of selecting a positive number` }
      ];
    } while (new Set([k / n, ...pool.map(o => o.v)].map(v => v.toFixed(6))).size < 4);

    const positives = shuffle([...Array(31).keys()].map(i => i + 5)).slice(0, k);
    const negatives = shuffle([...Array(16).keys()].map(i => -(i + 5))).slice(0, n - k);
    const dataSet = shuffle([...positives, ...negatives]);

    // Negative numbers use a true minus sign.
    const tableCode = `<table><thead><tr><th>Data set values</th></tr></thead><tbody>${dataSet.map(v => `<tr><td>${v < 0 ? `&minus;${-v}` : v}</td></tr>`).join('')}</tbody></table>`;

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
    const posList = dataSet.filter(x => x > 0).map(String);
    const posPhrase = k === 1 ? `only ${posList[0]} is positive` : `${k} of them, ${posList.slice(0, -1).join(', ')}${k > 2 ? ',' : ''} and ${posList[k - 1]}, are positive`;

    return {
      questionText: `The table shows a data set of ${words[n]} numbers. If a number from this data set is selected at random, what is the probability of selecting a positive number?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The data set contains ${words[n]} numbers, and ${posPhrase}. So the probability of selecting a positive number is $\\frac{${k}}{${n}}$${gcd(k, n) > 1 ? `, or $${correctText}$` : ''}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
