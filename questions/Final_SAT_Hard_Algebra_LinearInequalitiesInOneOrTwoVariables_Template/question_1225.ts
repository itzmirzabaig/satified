import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1225
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 *
 * Description: Modeling a commission-based salary inequality.
 * Earnings E = base salary x + (rate/100) * sales s.
 * Goal: minMult * x <= E <= maxMult * x. Solve for s.
 * Issues fixed:
 * - correctAnswer was a bare letter (CORRECT_MISMATCH); now the correct option text.
 * - Distractor letters in the explanation now taken from the shuffled array.
 */
export const generator_1225 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    const commissionRate = getRandomInt(8, 15); // integer percent, e.g. 11%
    const minMultiplier = getRandomInt(2, 3);   // lower bound factor for base salary
    const maxMultiplier = getRandomInt(4, 5);   // upper bound factor for base salary

    // ----------------------------------------------------------------------
    // 2. MATHEMATICAL LOGIC
    // ----------------------------------------------------------------------
    // minMult * x <= x + (Rate/100) s <= maxMult * x
    // (minMult-1) x <= (Rate/100) s <= (maxMult-1) x
    // [100(minMult-1)/Rate] x <= s <= [100(maxMult-1)/Rate] x

    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

    // Formats 100*numeratorFactor / denominator as a reduced LaTeX fraction (or integer).
    const formatCoef = (numeratorFactor: number, denominator: number): string => {
      const num = 100 * numeratorFactor;
      const common = gcd(num, denominator);
      const simplifiedNum = num / common;
      const simplifiedDen = denominator / common;
      if (simplifiedDen === 1) return `${simplifiedNum}`;
      return `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    };

    // Correct coefficients: 100(m-1)/rate
    const coefLow = formatCoef(minMultiplier - 1, commissionRate);
    const coefHigh = formatCoef(maxMultiplier - 1, commissionRate);

    // Distractor 1: forgot to subtract the base salary -> 100*m/rate
    const d1Low = formatCoef(minMultiplier, commissionRate);
    const d1High = formatCoef(maxMultiplier, commissionRate);

    // Distractor 2: forgot the 100/rate factor entirely -> (m-1)
    const d2Low = `${minMultiplier - 1}`;
    const d2High = `${maxMultiplier - 1}`;

    // Distractor 3: compared sales directly to the multiplier -> m
    const d3Low = `${minMultiplier}`;
    const d3High = `${maxMultiplier}`;

    // ----------------------------------------------------------------------
    // 3. OPTIONS
    // ----------------------------------------------------------------------
    // In the declared ranges the four (low,high) pairs are always distinct
    // strings (numerator m-1 vs m never coincide, and 100k/rate != k since
    // rate <= 15 != 100), so no dedup retry is required.
    const optionsData = [
      { text: `$${coefLow}x \\le s \\le ${coefHigh}x$`, isCorrect: true,  kind: "correct" },
      { text: `$${d1Low}x \\le s \\le ${d1High}x$`,     isCorrect: false, kind: "d1" },
      { text: `$${d2Low}x \\le s \\le ${d2High}x$`,     isCorrect: false, kind: "d2" },
      { text: `$${d3Low}x \\le s \\le ${d3High}x$`,     isCorrect: false, kind: "d3" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    // Decimal string for the earnings formula (e.g. 11% -> 0.11, 8% -> 0.08)
    const rateDecimal = commissionRate < 10 ? `0.0${commissionRate}` : `0.${commissionRate}`;

    return {
      questionText: `A salesperson's total earnings consist of a base salary of $x$ dollars per year, plus commission earnings of $${commissionRate}\\%$ of the total sales the salesperson makes during the year. This year, the salesperson has a goal for the total earnings to be at least $${minMultiplier}$ times and at most $${maxMultiplier}$ times the base salary. Which of the following inequalities represents all possible values of total sales $s$, in dollars, the salesperson can make this year in order to meet that goal?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        Let $E$ be the total earnings and $s$ be the total sales. The earnings are the base salary plus commission, so $E = x + ${rateDecimal}s$.
        <br/>
        The goal is total earnings at least $${minMultiplier}x$ and at most $${maxMultiplier}x$:
        $$${minMultiplier}x \\le x + ${rateDecimal}s \\le ${maxMultiplier}x$$
        Subtract the base salary $x$ from each part:
        $$${minMultiplier - 1}x \\le \\frac{${commissionRate}}{100}s \\le ${maxMultiplier - 1}x$$
        Multiply each part by $\\frac{100}{${commissionRate}}$ to isolate $s$ and simplify:
        $$${coefLow}x \\le s \\le ${coefHigh}x$$
        <br/>
        Choice ${letterOf("d1")} is incorrect: it uses $${minMultiplier}$ and $${maxMultiplier}$ in the numerators, forgetting to subtract the base salary $x$ before dividing by the rate.
        Choice ${letterOf("d2")} is incorrect: it keeps $${minMultiplier - 1}$ and $${maxMultiplier - 1}$ without dividing by the commission rate $\\frac{${commissionRate}}{100}$.
        Choice ${letterOf("d3")} is incorrect: it compares the sales directly to $${minMultiplier}x$ and $${maxMultiplier}x$, ignoring both the base salary and the commission rate.
      `
    };
  }
};
