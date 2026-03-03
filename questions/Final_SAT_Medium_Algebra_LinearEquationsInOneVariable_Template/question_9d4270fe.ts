import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9d4270fe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2.00, fixed cost: 4500, profit: 15000 (mixed ranges)]
 * - Difficulty factors: [Contextual interpretation, algebraic modeling]
 * - Distractor patterns: [B confuses per-unit vs total revenue, C confuses cost/revenue, D confuses fixed cost with revenue]
 * - Constraints: [Profit equation structure: Profit = Revenue - Cost]
 * - Question type: [Contextual interpretation - Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_9d4270fe = {
  metadata: {
    // id: "9d4270fe",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original uses price per unit around $2, fixed costs around $4500, profit around $15000
    const pricePerUnit = getRandomInt(15, 35) / 10; // 1.5 to 3.5 dollars
    const fixedCost = getRandomInt(20, 80) * 100; // 2000 to 8000
    const profit = getRandomInt(50, 200) * 100; // 5000 to 20000
    
    // Calculate units sold to make the equation work
    const unitsSold = Math.round((profit + fixedCost) / pricePerUnit);
    
    // Generate product name
    const products = ["tape dispensers", "pencil sharpeners", "notebook holders", "desk organizers", "file folders", "staplers"];
    const product = getRandomElement(products);
    
    // STEP 2: Create options with tracking
    const correctText = `The monthly sales revenue, in dollars, from selling ${product}`;
    const optionsData = [
      { text: `The monthly sales revenue, in dollars, from selling ${product}`, isCorrect: true },
      { text: `The monthly sales revenue, in dollars, from each ${product.slice(0, -1)} sold`, isCorrect: false, reason: "This would be just the price per unit, not the total revenue" },
      { text: `The monthly cost, in dollars, of creating each ${product.slice(0, -1)}`, isCorrect: false, reason: "results from conceptual confusion between cost and revenue" },
      { text: `The monthly cost, in dollars, of creating ${product}`, isCorrect: false, reason: "This is the fixed cost interpretation" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `A company that creates and sells ${product} calculates its monthly profit, in dollars, by subtracting its fixed monthly costs, in dollars, from its monthly sales revenue, in dollars. The equation $${profit.toLocaleString()}=${pricePerUnit.toFixed(2)} x-${fixedCost.toLocaleString()}$ represents this situation for a month where $x$ ${product} are created and sold. Which statement is the best interpretation of $${pricePerUnit.toFixed(2)} x$ in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that the equation $${profit.toLocaleString()} = ${pricePerUnit.toFixed(2)}x - ${fixedCost.toLocaleString()}$ represents this situation for a month where $x$ ${product} are created and sold. It's also given that the company calculates its monthly profit, in dollars, by subtracting its fixed monthly costs, in dollars, from its monthly sales revenue, in dollars. It follows that $${pricePerUnit.toFixed(2)}x$ represents the monthly sales revenue, in dollars. Therefore, the best interpretation of $${pricePerUnit.toFixed(2)}x$ in this context is the monthly sales revenue from selling $x$ ${product}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7a5a74a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 2, 6, 11, 4, 3, 6 (single-digit to double-digit)]
 * - Difficulty factors: [Algebraic manipulation, substitution, solving for expression x-3]
 * - Distractor patterns: [A gives value of x instead of x-3, C and D are values that don't satisfy the equation]
 * - Constraints: [Must solve for x-3 directly or find x then subtract 3]
 * - Question type: [Equation solving - Multiple Choice Text]
 * - Figure generation: [None]
 */