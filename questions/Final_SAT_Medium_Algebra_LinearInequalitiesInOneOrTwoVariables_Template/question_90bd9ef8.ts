import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 90bd9ef8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [current cost: 4334, new cost: 2712, install: 25000]
 * - Difficulty factors: [Savings calculation, inequality setup for payback]
 * - Distractor patterns: [A=wrong direction, C=wrong operation, D=ratio error]
 * - Constraints: [25000 < (4334-2712)*t]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_90bd9ef8 = {
  metadata: {
    // id: "90bd9ef8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const currentCost = getRandomInt(3500, 5500);
    const savings = getRandomInt(1000, 2500);
    const newCost = currentCost - savings;
    const installCost = getRandomInt(20000, 30000);
    
    // STEP 2: Create options - NO dollar signs in the math, just numbers
    const annualSavings = currentCost - newCost;
    
    const optionsData = [
      { text: `${installCost} > ${annualSavings}t`, isCorrect: false },
      { text: `${installCost} < ${annualSavings}t`, isCorrect: true },
      { text: `${installCost} - ${currentCost} > ${newCost}t`, isCorrect: false },
      { text: `${installCost} > \\frac{${currentCost}}{${newCost}}t`, isCorrect: false }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build explanation - use words instead of $ symbols
    const explanation = `Choice ${correctOption.letter} is correct. Annual savings is ${currentCost} dollars minus ${newCost} dollars, which equals ${annualSavings} dollars. Total savings after $t$ years is ${annualSavings}t$ dollars. We want this to exceed the installation cost of ${installCost} dollars, so ${installCost} < ${annualSavings}t$. Choice ${incorrectOptions[0].letter} reverses the inequality. Choice ${incorrectOptions[1].letter} subtracts current cost incorrectly. Choice ${incorrectOptions[2].letter} uses a ratio which doesn't represent savings.`;
    
    // STEP 5: Return question data
    return {
      questionText: `The average annual energy cost for a certain home is ${currentCost} dollars. The homeowner plans to spend ${installCost} dollars to install a geothermal heating system. The homeowner estimates that the average annual energy cost will then be ${newCost} dollars. Which of the following inequalities can be solved to find $t$, the number of years after installation at which the total amount of energy cost savings will exceed the installation cost?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: `$${o.text}$` })),
      correctAnswer: correctOption.letter,
      explanation: explanation
    };
  }
};