import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 435
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 200 (triple-digit), percentage: 147% (over 100%)]
 * - Difficulty factors: [Percentage over 100%, multiplication with decimals]
 * - Distractor patterns: [247 = added 47, 347 = miscalculation, 394 = calculation error]
 * - Constraints: [Result must be clean integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_435 = {
  metadata: {
    id: "435",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first: base and percentage are multiples of 10, so
    // base * percentage / 100 is always an exact integer (base=10a, pct=10b
    // => 100ab/100 = ab). This keeps a triple-digit base and an over-100%
    // percentage while guaranteeing the explanation's "= result" is exact.
    const base = 10 * getRandomInt(10, 30);   // 100..300, multiple of 10
    const percentage = 10 * getRandomInt(11, 16); // 110..160, multiple of 10
    const result = (base * percentage) / 100; // exact integer, always > base

    // Wrong choices: last year's number, the increase alone, and the result
    // of reading the percentage as a percent increase. The increase is less
    // than 0.6 times the base and the other values exceed the base, so all
    // four choices differ.
    const increase = result - base;
    const optionsData = [
      { text: `${result}`, isCorrect: true, reason: '' },
      { text: `${base}`, isCorrect: false, reason: `${base} is last year's enrollment; this year's enrollment is ${percentage}% of that number` },
      { text: `${increase}`, isCorrect: false, reason: `${increase} is only the increase in enrollment, ${percentage - 100}% of ${base}, not this year's total enrollment` },
      { text: `${result + base}`, isCorrect: false, reason: `${result + base} is the result of increasing ${base} by ${percentage}%, but this year's enrollment is ${percentage}% of last year's number, not ${percentage}% more than it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Last year, ${base} students enrolled in an interior design program. This year, the number of students enrolled is ${percentage}% of last year's number. How many students are enrolled in the interior design program this year?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. This year's enrollment is ${percentage}% of last year's ${base} students: $\\frac{${percentage}}{100} \\times ${base} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
