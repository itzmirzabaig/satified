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

    // Distractors chosen so all four options are provably distinct for every
    // draw in the range (verified across all base x percentage combinations):
    //   - base < result since percentage > 100, so base never equals result;
    //   - result+base and 2*result-base are distinct from result and base
    //     because percentage stays between 110 and 160 (result is never 2*base).
    const dKeepBase = base;                 // used last year's number (ignored the increase)
    const dAddOnTop = result + base;        // added last year's number on top of this year's
    const dDoubleIncrease = 2 * result - base; // applied the percentage increase twice

    const optionsData = [
      { text: `${result}`, isCorrect: true },
      { text: `${dKeepBase}`, isCorrect: false, reason: `is last year's enrollment, so it ignores the increase to ${percentage}% of that number` },
      { text: `${dAddOnTop}`, isCorrect: false, reason: `adds last year's ${base} students on top of this year's total instead of replacing it` },
      { text: `${dDoubleIncrease}`, isCorrect: false, reason: "comes from applying the percentage increase a second time" }
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
      explanation: `Choice ${correctOption.letter} is correct. To find this year's enrollment, take ${percentage}% of last year's ${base} students: $\\frac{${percentage}}{100} \\times ${base} = ${result}$ students. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
