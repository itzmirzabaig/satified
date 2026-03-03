import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8ad64841
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [8 items: $220, 10 items: $320, slope=50, intercept=-180]
 * - Difficulty factors: [Finding linear profit function from two points]
 * - Distractor patterns: [A = wrong slope/intercept, B = wrong calculation, C = wrong formula]
 * - Constraints: [None - straightforward modeling]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8ad64841 = {
  metadata: {
    // id: "8ad64841",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // x1: 5-12
    const x1 = getRandomInt(5, 12);
    // x2: x1 + 2 to x1 + 5
    const x2 = x1 + getRandomInt(2, 5);
    // Profit per item: 40-70
    const profitPerItem = getRandomInt(40, 70);
    // Fixed cost (will be negative intercept)
    const fixedCost = getRandomInt(100, 250);
    // Profits
    const p1 = profitPerItem * x1 - fixedCost;
    const p2 = profitPerItem * x2 - fixedCost;
    
    // STEP 2: Create options with LaTeX delimiters
    const correctEq = `$f(x) = ${profitPerItem}x - ${fixedCost}$`;
    const distA = `$f(x) = ${profitPerItem + 100}x - ${fixedCost + 100}$`;
    const distB = `$f(x) = ${Math.floor(p1/x1)}x$`; // Break-even confusion
    const distC = `$f(x) = ${profitPerItem}x - ${fixedCost}x$`; // Wrong formula
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "has wrong slope and intercept" },
      { text: distB, isCorrect: false, reason: "incorrectly assumes direct variation" },
      { text: distC, isCorrect: false, reason: "incorrectly subtracts variable cost" },
      { text: correctEq, isCorrect: true }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `A linear function $f$ gives a company's profit, in dollars, for selling $x$ items. The company's profit is $${p1}$ when it sells $${x1}$ items, and its profit is $${p2}$ when it sells $${x2}$ items. Which equation defines $f$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter, // Should be the letter, not the equation text
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${p2} - ${p1}}{${x2} - ${x1}} = \\frac{${p2 - p1}}{${x2 - x1}} = ${profitPerItem}$. Using point $(${x1}, ${p1})$: $${p1} = ${profitPerItem}(${x1}) + b$, so $b = ${p1} - ${profitPerItem * x1} = ${-fixedCost}$. Thus $f(x) = ${profitPerItem}x - ${fixedCost}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};