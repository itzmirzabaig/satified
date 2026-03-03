import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: dd8ac009
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 670, rate: 0.006 (0.6%), table values]
 * - Difficulty factors: [Exponential growth from table, compound interest]
 * - Distractor patterns: [A: wrong structure, C: missing principal, D: extreme values]
 * - Constraints: [d = P(1+r)^t, P = 670, r = 0.006]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_dd8ac009 = {
  metadata: {
    // id: "dd8ac009",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: initial = 670, rate ≈ 0.006
    // Randomize: initial (400-900), rate (0.004-0.008)
    const initial = getRandomInt(40, 90) * 10; // 400 to 900
    const rate = (getRandomInt(4, 8) / 1000); // 0.004 to 0.008
    const growthFactor = 1 + rate;
    
    // STEP 2: Calculate table values
    const year0 = initial.toFixed(2);
    const year1 = (initial * growthFactor).toFixed(2);
    const year2 = (initial * growthFactor * growthFactor).toFixed(2);
    
    // STEP 3: Build table code
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">Time (years)</th><th style="border: 1px solid currentColor; padding: 8px;">Total amount (dollars)</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">0</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year0}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">1</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">2</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${year2}</td></tr></tbody></table>`;
    
    // STEP 4: Build question text
    const questionText = `Sara opened a savings account at a bank. The table shows the exponential relationship between the time $t$, in years, since Sara opened the account and the total amount $d$, in dollars, in the account. If Sara made no additional deposits or withdrawals, which of the following equations best represents the relationship between $t$ and $d$?`;
    
    // STEP 5: Create options with tracking
    const rateStr = rate.toFixed(3).replace(/^0\./, '0.');
    
    const optionsData = [
      { text: `$d=${rateStr}(1+${initial})^t$`, isCorrect: false, reason: "has the wrong structure with rate as principal and principal as exponent base" },
      { text: `$d=${initial}(1+${rateStr})^t$`, isCorrect: true },
      { text: `$d=(1+${rateStr})^t$`, isCorrect: false, reason: "missing the principal amount ${initial}" },
      { text: `$d=(1+${initial})^t$`, isCorrect: false, reason: "uses ${initial} incorrectly in the base instead of as the coefficient" }
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
    const explanation = `Choice ${correctLetter} is correct. At $t=0$, $d=${initial}$, so the principal is ${initial}. For choice ${correctLetter}, at $t=1$: $d = ${initial}(1+${rateStr})^1 = ${initial} \\\\times ${growthFactor.toFixed(3)} = ${year1}$, which matches the table. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
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

/**
 * Question ID: dbe9b217
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 8x³ + 4, f(2) = 68]
 * - Difficulty factors: [Simple function evaluation, cubing]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [f(2) = 8(8) + 4 = 68]
 * - Question type: [No Figure→Fill in the Blank]
 * - Figure generation: [None - pure evaluation]
 */