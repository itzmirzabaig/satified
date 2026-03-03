import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9a216c0f
 * 
 * ANALYSIS:
 * - Skill: Systems of Linear Equations (Word Problems)
 * - Issue Fixed: Plain text (percentages, currency) was wrapped in '$', triggering LaTeX rendering mode 
 *   and causing text to vanish or format as broken math.
 * - Logic: Preserved original number generation and ranges.
 */

export const generator_9a216c0f = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original price ranges
    const totalOriginal = getRandomInt(40, 100);
    
    // Discount percentages (e.g., 25, 40)
    const discount1 = getRandomInt(15, 35);
    const discount2 = getRandomInt(35, 55);
    
    // Generate split prices to calculate total sale
    const price1 = (getRandomInt(20, totalOriginal - 20));
    const price2 = totalOriginal - price1;
    
    // Calculate final sale price
    const totalSale = price1 * (1 - discount1/100) + price2 * (1 - discount2/100);
    const roundedSale = Math.round(totalSale);
    
    // STEP 2: Format coefficients for options
    // We use (100-d)/100 logic to ensure floating point stability before toFixed
    const remPct1 = (100 - discount1) / 100;
    const remPct2 = (100 - discount2) / 100;
    
    const remaining1 = remPct1.toFixed(2).replace(/\.?0+$/, '');
    const remaining2 = remPct2.toFixed(2).replace(/\.?0+$/, '');
    
    const d1Dec = (discount1 / 100).toFixed(2).replace(/\.?0+$/, '');
    const d2Dec = (discount2 / 100).toFixed(2).replace(/\.?0+$/, '');
    
    // STEP 3: Build question text
    // FIX: Use \$ for literal currency and avoid $ around simple text percentages
    const questionText = `The combined original price for a mirror and a vase is \\$${totalOriginal}. After a ${discount1}% discount to the mirror and a ${discount2}% discount to the vase are applied, the combined sale price for the two items is \\$${roundedSale}. Which system of equations gives the original price $m$, in dollars, of the mirror and the original price $v$, in dollars, of the vase?`;
    
    // STEP 4: Create options
    // Option A: Swapped discount rates
    // Option B: Uses discount amount instead of remaining amount
    // Option C: Correct (Remaining amounts)
    // Option D: Uses discount decimals
    
    // Note: We use distinct strings for options to ensure they render cleanly
    const optionA = `$m+v=${totalOriginal}$\n$${remaining2}m+${remaining1}v=${roundedSale}$`;
    const optionB = `$m+v=${totalOriginal}$\n$${d1Dec}m+${d2Dec}v=${roundedSale}$`;
    const optionC = `$m+v=${totalOriginal}$\n$${remaining1}m+${remaining2}v=${roundedSale}$`;
    const optionD = `$m+v=${totalOriginal}$\n$${d1Dec}m+${d2Dec}v=${roundedSale}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: true },
      { text: optionD, isCorrect: false }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 6: Build Explanation
    // FIX: Ensure text mode is used for descriptions and math mode only for equations/variables
    const explanation = `
      The first sentence states that the combined original price of the mirror and the vase is \\$${totalOriginal}. Let $m$ be the price of the mirror and $v$ be the price of the vase. This translates directly to the equation:
      $$m + v = ${totalOriginal}$$

      The second sentence describes the sale prices.
      
      1. The mirror has a ${discount1}% discount. This means the sale price is $100\\% - ${discount1}\\% = ${100 - discount1}\\%$ of the original price. Converting to a decimal, the sale price of the mirror is $${remaining1}m$.
      
      2. The vase has a ${discount2}% discount. This means the sale price is $100\\% - ${discount2}\\% = ${100 - discount2}\\%$ of the original price. Converting to a decimal, the sale price of the vase is $${remaining2}v$.

      The combined sale price is given as \\$${roundedSale}. This gives us the second equation:
      $$${remaining1}m + ${remaining2}v = ${roundedSale}$$

      Looking at the options:
      
      *   Choice A swaps the discounts.
      *   Choice B uses the discount percentages ($${d1Dec}$ and $${d2Dec}$) instead of the remaining price percentages.
      *   Choice ${correctLetter} matches our derived system.
      *   Choice D also uses the discount percentages incorrectly.

      Therefore, the correct system is Choice ${correctLetter}.
    `.trim(); // Trim to remove initial newline
    
    // STEP 7: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};