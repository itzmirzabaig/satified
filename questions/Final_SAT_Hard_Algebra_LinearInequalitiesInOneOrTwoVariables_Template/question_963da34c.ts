import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 963da34c
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Word problem involving box dimensions, perimeter, and height constraints.
 * Fixes:
 * - Reverse-engineered numbers to ensure the correct answer is an integer.
 * - Fixed LaTeX fraction formatting (was rendering as raw text).
 * - Cleaned up distractors to be mathematically plausible errors.
 */
export const generator_963da34c = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE CLEAN NUMBERS
    // ----------------------------------------------------------------------
    // Formula: Perimeter + Height <= MaxSum
    // P = 2(w + l). l = m * w.
    // P = 2(w + mw) = 2w(1+m)
    // Constraint: 2w(1+m) + h <= MaxSum
    // w <= (MaxSum - h) / (2(1+m))
    
    // Pick a multiplier (m) that is common (1.5, 2, 2.5, 3)
    const multiplier = getRandomElement([1.5, 2, 2.5, 3, 4]);
    
    // Calculate the coefficient for width in the perimeter formula: 2(1+m)
    const perimeterCoef = 2 * (1 + multiplier);
    
    // Select a TARGET integer width for the correct answer (clean number)
    // e.g., width <= 10
    const targetWidth = getRandomInt(8, 20);
    
    // Calculate the "Budget" for the perimeter (MaxSum - Height)
    const perimeterBudget = targetWidth * perimeterCoef;
    
    // Select a random height
    const height = getRandomInt(4, 9) * 10; // 40, 50, ..., 90
    
    // Calculate the total MaxSum
    const maxSum = perimeterBudget + height;

    // ----------------------------------------------------------------------
    // 2. GENERATE DISTRACTORS
    // ----------------------------------------------------------------------
    
    // Distractor 1: Forgets the factor of 2 in perimeter calculation
    // Solves: w(1+m) <= MaxSum - h
    // Result is exactly double the correct answer
    const d1Val = perimeterBudget / (1 + multiplier); 

    // Distractor 2: Forgets to subtract height
    // Solves: 2w(1+m) <= MaxSum
    const d2Val = maxSum / perimeterCoef;

    // Distractor 3: Assumes Perimeter = 4w (Square approximation) or error
    const d3Val = perimeterBudget / 4;

    // ----------------------------------------------------------------------
    // 3. FORMATTING
    // ----------------------------------------------------------------------
    const formatNumber = (num: number) => {
      if (Math.abs(num - Math.round(num)) < 0.001) {
        return Math.round(num).toString();
      }
      // Check for .5
      if (Math.abs(num - Math.floor(num) - 0.5) < 0.001) {
        return `${Math.floor(num)}\\frac{1}{2}`;
      }
      // Check for .25, .75
      if (Math.abs(num - Math.floor(num) - 0.25) < 0.001) {
        return `${Math.floor(num)}\\frac{1}{4}`;
      }
      if (Math.abs(num - Math.floor(num) - 0.75) < 0.001) {
        return `${Math.floor(num)}\\frac{3}{4}`;
      }
      return num.toFixed(1);
    };

    const optionsData = [
      { text: `$0 < x \\le ${formatNumber(targetWidth)}$`, isCorrect: true },
      { text: `$0 < x \\le ${formatNumber(d1Val)}$`, isCorrect: false },
      { text: `$0 < x \\le ${formatNumber(d2Val)}$`, isCorrect: false },
      { text: `$0 < x \\le ${formatNumber(d3Val)}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)?.letter;

    return {
      questionText: `A shipping service restricts the dimensions of the boxes it will ship for a certain type of service. The restriction states that for boxes shaped like rectangular prisms, the sum of the perimeter of the base of the box and the height of the box cannot exceed $${maxSum}$ inches. The perimeter of the base is determined using the width and length of the box. If a box has a height of $${height}$ inches and its length is $${multiplier}$ times the width, which inequality shows the allowable width $x$, in inches, of the box?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: shuffledOptions.find(o => o.isCorrect).text,
      explanation: `
        Choice ${correctLetter} is correct.
        <br/><br/>
        Let $x$ be the width of the box. Since the length is $${multiplier}$ times the width, length $l = ${multiplier}x$.
        <br/>
        The perimeter of the base is $P = 2(width + length) = 2(x + ${multiplier}x) = 2(${1 + multiplier}x) = ${perimeterCoef}x$.
        <br/><br/>
        The restriction states:
        $$ \\text{Perimeter} + \\text{Height} \\le ${maxSum} $$
        $$ ${perimeterCoef}x + ${height} \\le ${maxSum} $$
        <br/>
        Subtract $${height}$ from both sides:
        $$ ${perimeterCoef}x \\le ${maxSum - height} $$
        $$ ${perimeterCoef}x \\le ${perimeterBudget} $$
        <br/>
        Divide by $${perimeterCoef}$:
        $$ x \\le ${targetWidth} $$
        <br/>
        Since the width must be positive ($x > 0$), the correct inequality is $0 < x \\le ${targetWidth}$.
      `
    };
  }
};