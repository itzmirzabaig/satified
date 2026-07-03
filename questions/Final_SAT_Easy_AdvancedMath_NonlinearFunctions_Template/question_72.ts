import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 72
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 100000-300000, rate: 1.15-1.25, year: 4-8]
 * - Difficulty factors: [Interpreting function notation P(t) = y in an exponential context]
 * - Distractor patterns: [Increase interpretation, multiplicative interpretation, percent interpretation]
 * - Constraints: [Context is annual revenue]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_72 = {
  metadata: {
    id: "72",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(100, 300) * 1000;

    // Growth factor 1.15-1.24, always rendered with exactly two decimals.
    const rateInt = getRandomInt(115, 124);
    const rate = (rateInt / 100).toFixed(2);
    const pct = rateInt - 100;

    const year = getRandomInt(4, 8);

    const value = Math.floor(initial * Math.pow(rateInt / 100, year));

    // Commas inside math mode need {,} so MathJax renders them tightly.
    const initialTex = initial.toLocaleString('en-US').replace(/,/g, '{,}');
    const valueStr = value.toLocaleString('en-US');

    const optionsData = [
      {
        text: `${year} years after the company started selling light bulbs online, its predicted annual revenue is approximately ${valueStr} dollars.`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `${year} years after the company started selling light bulbs online, its predicted annual revenue will have increased by a total of approximately ${valueStr} dollars.`,
        isCorrect: false,
        reason: `The value ${valueStr} is the total predicted annual revenue after ${year} years, not the amount by which the revenue increased.`
      },
      {
        text: `When the company's predicted annual revenue is approximately ${valueStr} dollars, it is ${year} times the predicted annual revenue for the previous year.`,
        isCorrect: false,
        reason: `Each year the predicted annual revenue is ${rate} times the previous year's revenue, not ${year} times.`
      },
      {
        text: `When the company's predicted annual revenue is approximately ${valueStr} dollars, it is ${year}% greater than the predicted annual revenue for the previous year.`,
        isCorrect: false,
        reason: `Each year the predicted annual revenue is ${pct}% greater than the previous year's revenue, not ${year}% greater.`
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `The function $f(x)=${initialTex}(${rate})^{x}$ gives a company's predicted annual revenue, in dollars, $x$ years after the company started selling light bulbs online, where $x$ is greater than 0 and less than 10. What is the best interpretation of the statement "$f(${year})$ is approximately equal to ${valueStr}" in this context?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The notation $f(${year})$ gives the value of the function when $x=${year}$. Because $x$ represents the number of years after the company started selling light bulbs online and $f(x)$ gives the predicted annual revenue in dollars, the statement means that ${year} years after the company started selling light bulbs online, its predicted annual revenue is approximately ${valueStr} dollars. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect. ${o.reason}`).join(' ')}`
    };
  }
};
