import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 606
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 670, rate: 0.006 (0.6%), table values]
 * - Difficulty factors: [Exponential growth from table, compound interest]
 * - Distractor patterns: [A: wrong structure, C: missing principal, D: extreme values]
 * - Constraints: [d = P(1+r)^t, P = 670, r = 0.006]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_606 = {
  metadata: {
    id: "606",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: initial = 670, rate ≈ 0.006
    // Randomize: initial (400-900, multiple of 10), rate (0.004-0.008)
    const initial = getRandomInt(40, 90) * 10; // 400 to 900
    const rate = getRandomInt(4, 8) / 1000; // 0.004 to 0.008
    const growthFactor = 1 + rate;

    // STEP 2: Calculate table values.
    // initial is a multiple of 10 and rate has 3 decimals, so
    // initial * growthFactor is exact to 2 decimal places.
    const year0 = initial.toFixed(2);
    const year1 = (initial * growthFactor).toFixed(2);
    const year2 = (initial * growthFactor * growthFactor).toFixed(2);

    // STEP 3: Build table code
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">Time (years)</th><th style="border: 1px solid currentColor; padding: 8px;">Total amount (dollars)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year2}</td></tr></tbody></table>`;

    // STEP 4: Build question text (generic role, no personal names)
    const questionText = `A student opened a savings account at a bank. The table shows the exponential relationship between the time $t$, in years, since she opened the account and the total amount $d$, in dollars, in the account. If she made no additional deposits or withdrawals, which of the following equations best represents the relationship between $t$ and $d$?`;

    // STEP 5: Create options with tracking
    const rateStr = rate.toFixed(3);

    const optionsData = [
      { text: `$d=${rateStr}(1+${initial})^t$`, isCorrect: false, reason: "swaps the roles of the initial amount and the growth rate" },
      { text: `$d=${initial}(1+${rateStr})^t$`, isCorrect: true },
      { text: `$d=(1+${rateStr})^t$`, isCorrect: false, reason: `is missing the initial amount of ${initial} dollars` },
      { text: `$d=(1+${initial})^t$`, isCorrect: false, reason: `uses the initial amount ${initial} in place of the growth rate` }
    ];

    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$d=${initial}(1+${rateStr})^t$`;

    // STEP 7: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. An exponential relationship has the form $d = P(1+r)^t$, where $P$ is the initial amount and $r$ is the growth rate. At $t=0$ the table shows $d=${initial}$, so $P=${initial}$. Checking $t=1$: $d = ${initial}(1+${rateStr})^1 = ${initial} \\times ${growthFactor.toFixed(3)} = ${year1}$, which matches the table. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 8: Return question data
    return {
      questionText: questionText,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
