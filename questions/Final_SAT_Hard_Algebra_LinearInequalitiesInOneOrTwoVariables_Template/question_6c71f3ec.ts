import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6c71f3ec
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Modeling a commission-based salary inequality.
 * Issues Fixed:
 * - "frac" rendering as text (fixed escape sequences).
 * - Logic error: Missing factor of 100 when dividing by percentage (e.g., 0.11).
 */
export const generator_6c71f3ec = {
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
    const commissionRate = getRandomInt(8, 15); // Integer percent, e.g., 11%
    const minMultiplier = getRandomInt(2, 3); // Lower bound factor for base salary
    const maxMultiplier = getRandomInt(4, 5); // Upper bound factor for base salary
    
    // ----------------------------------------------------------------------
    // 2. MATHEMATICAL LOGIC
    // ----------------------------------------------------------------------
    // Earnings E = Base(x) + Commission
    // Commission = (Rate/100) * Sales(s)
    // Goal: minMult * x <= E <= maxMult * x
    // Substitution: minMult * x <= x + (Rate/100)s <= maxMult * x
    // Subtract x: (minMult - 1)x <= (Rate/100)s <= (maxMult - 1)x
    // Solve for s: [100 * (minMult - 1) / Rate] * x <= s <= [100 * (maxMult - 1) / Rate] * x

    // Helper: Greatest Common Divisor for simplifying fractions
    const gcd = (a: number, b: number): number => {
      return b === 0 ? a : gcd(b, a % b);
    };

    // Helper: Formats fraction for LaTeX
    const formatCoef = (numeratorFactor: number, denominator: number): string => {
      const num = 100 * numeratorFactor; // Apply the percentage factor (100)
      const common = gcd(num, denominator);
      const simplifiedNum = num / common;
      const simplifiedDen = denominator / common;

      if (simplifiedDen === 1) {
        return `${simplifiedNum}`;
      }
      // Use \\frac to produce string "\frac" which renders correctly
      return `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    };

    // Correct Coefficients
    const coefLow = formatCoef(minMultiplier - 1, commissionRate);
    const coefHigh = formatCoef(maxMultiplier - 1, commissionRate);

    // Distractor 1: Forgotten Base Salary Subtraction (uses minMultiplier directly)
    // Formula: [100 * minMult / Rate]
    const d1Low = formatCoef(minMultiplier, commissionRate);
    const d1High = formatCoef(maxMultiplier, commissionRate);

    // Distractor 2: Forgot Percentage Factor (uses (min-1)/Rate instead of 100*(min-1)/Rate)
    // This results in very small fractions or plain text confusion, usually represented as just the integers
    // if students forget the rate division entirely. Let's model "Compares sales directly to multiplier difference"
    // s >= (min-1)x
    const d2Low = `${minMultiplier - 1}`;
    const d2High = `${maxMultiplier - 1}`;

    // Distractor 3: Direct Multiplier Comparison (s >= minMult * x)
    const d3Low = `${minMultiplier}`;
    const d3High = `${maxMultiplier}`;

    // ----------------------------------------------------------------------
    // 3. OPTIONS GENERATION
    // ----------------------------------------------------------------------
    const optionsData = [
      { 
        text: `$${coefLow}x \\le s \\le ${coefHigh}x$`, 
        isCorrect: true 
      },
      { 
        text: `$${d1Low}x \\le s \\le ${d1High}x$`, 
        isCorrect: false 
      },
      { 
        text: `$${d2Low}x \\le s \\le ${d2High}x$`, 
        isCorrect: false 
      },
      { 
        text: `$${d3Low}x \\le s \\le ${d3High}x$`, 
        isCorrect: false 
      }
    ];

    const shuffledOptions = shuffle(optionsData);
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = String.fromCharCode(65 + shuffledOptions.indexOf(correctOption));

    // Decimal string for explanation (e.g. 11% -> 0.11, 8% -> 0.08)
    const rateDecimal = commissionRate < 10 ? `0.0${commissionRate}` : `0.${commissionRate}`;

    return {
      questionText: `A salesperson's total earnings consist of a base salary of $x$ dollars per year, plus commission earnings of $${commissionRate}\\%$ of the total sales the salesperson makes during the year. This year, the salesperson has a goal for the total earnings to be at least $${minMultiplier}$ times and at most $${maxMultiplier}$ times the base salary. Which of the following inequalities represents all possible values of total sales $s$, in dollars, the salesperson can make this year in order to meet that goal?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        Let $E$ be the total earnings and $s$ be the total sales.
        The earnings formula is $E = x + ${rateDecimal}s$.
        <br/>
        The problem states that the total earnings ($E$) must be at least $${minMultiplier}x$ and at most $${maxMultiplier}x$:
        $$${minMultiplier}x \\le x + ${rateDecimal}s \\le ${maxMultiplier}x$$
        <br/>
        Subtract the base salary $x$ from all parts of the inequality:
        $$(${minMultiplier} - 1)x \\le ${rateDecimal}s \\le (${maxMultiplier} - 1)x$$
        $$${minMultiplier - 1}x \\le \\frac{${commissionRate}}{100}s \\le ${maxMultiplier - 1}x$$
        <br/>
        To isolate $s$, multiply all parts by the reciprocal of the commission rate, $\\frac{100}{${commissionRate}}$:
        $$s \\ge \\frac{100}{${commissionRate}}(${minMultiplier - 1}x) \\quad \\text{and} \\quad s \\le \\frac{100}{${commissionRate}}(${maxMultiplier - 1}x)$$
        <br/>
        Simplifying these fractions gives:
        $$${coefLow}x \\le s \\le ${coefHigh}x$$
      `
    };
  }
};