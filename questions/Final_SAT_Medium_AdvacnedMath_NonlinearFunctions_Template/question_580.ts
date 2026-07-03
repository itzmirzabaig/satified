import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 580
 *
 * ORIGINAL ANALYSIS:
 * - Type: Exponential model from two points
 * - Number ranges: Initial ~36100, final ~68071 after 13 years
 * - Difficulty: Medium - deriving exponential equation from data points
 * - Distractor patterns: Wrong initial value, decay instead of growth
 *
 * FIXED:
 * - Currency is now escaped (\$) everywhere, so every field has a balanced,
 *   even count of math-$ delimiters (was TEX_UNBALANCED / DOLLAR_RISK).
 * - Final balance cents are computed from initial * 1.05^years (integer
 *   cents), not a fabricated hardcoded ".93" appended to a rounded value.
 * - Options are proper math-mode strings ($A(t) = ...$) so ^t renders;
 *   correctAnswer exactly equals the correct option string.
 * - Explanation verifies the correct equation against the given balance
 *   using the same live variables.
 */

export const generator_580 = {
  metadata: {
    id: "580",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const initialAmount = getRandomInt(30000, 40000); // whole dollars
    const years = getRandomInt(10, 15);
    const growthFactor = 1.05; // 5% annual growth

    // Work in integer cents so displayed amounts are exact for every draw.
    const initialCents = initialAmount * 100;
    const finalCents = Math.round(initialAmount * Math.pow(growthFactor, years) * 100);
    let diffCents = finalCents - initialCents; // distractor "initial value"
    // Safety guard: the difference can never round to the initial balance
    // for these ranges (ratio 0.63x–1.08x, never 1.00x), but keep options
    // provably distinct anyway.
    if (diffCents === initialCents) diffCents += 100;

    // Prose (plain text) money: "36,100.00" — always prefixed with \$ below.
    const money = (cents: number): string =>
      (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    // Math-mode money: "36{,}100.00" (braced commas render cleanly in TeX).
    const moneyTex = (cents: number): string => money(cents).replace(/,/g, '{,}');

    const questionText = `A company opens a savings account with an initial balance of \\$${money(initialCents)}. The account earns interest, and no additional deposits or withdrawals are made. The account balance is given by an exponential function $A$, where $A(t)$ is the account balance, in dollars, $t$ years after the account is opened. The account balance after ${years} years is \\$${money(finalCents)}. Which equation could define $A$?`;

    const correctText = `$A(t) = ${moneyTex(initialCents)}(1.05)^t$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: `` },
      { text: `$A(t) = ${moneyTex(diffCents)}(1.05)^t$`, isCorrect: false, reason: `uses the increase in the balance, \\$${money(diffCents)}, as the initial balance instead of \\$${money(initialCents)}` },
      { text: `$A(t) = ${moneyTex(diffCents)}(0.05)^t$`, isCorrect: false, reason: `uses the increase in the balance as the initial balance and uses the growth rate, 0.05, as the base instead of the growth factor, 1.05` },
      { text: `$A(t) = ${moneyTex(initialCents)}(0.05)^t$`, isCorrect: false, reason: `uses the growth rate, 0.05, as the base of the exponent instead of the growth factor, 1.05; this would model rapid decay, not growth` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const correctAnswer = correctOption.text;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. An exponential function that models the account balance can be written as $A(t) = a(b)^t$, where $a$ is the initial balance, in dollars, and $b$ is the growth factor for each year. The initial balance is \\$${money(initialCents)}, so $a = ${moneyTex(initialCents)}$. With a growth factor of $b = 1.05$, which corresponds to 5 percent interest earned each year, the balance after ${years} years is $A(${years}) = ${moneyTex(initialCents)}(1.05)^{${years}} \\approx ${moneyTex(finalCents)}$, which matches the given account balance of \\$${money(finalCents)}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};
