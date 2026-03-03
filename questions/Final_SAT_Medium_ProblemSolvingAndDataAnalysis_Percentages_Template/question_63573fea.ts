import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 63573fea
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [monthly sales: 1,300,000 (large number), return rate: 15%, period: 6 months]
 * - Difficulty factors: [Large number handling, percentage of large number, multi-month calculation]
 * - Distractor patterns: [A: single month only, B: 5 months only (forgets first month), D: magnitude error]
 * - Constraints: [Must multiply single month returns by 6 total months]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_63573fea = {
  metadata: {
    // id: "63573fea",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 1,300,000 units, 15% return rate, 6 months
    // Keep percentage "nice" (divisible by 5)
    const returnRate = getRandomInt(2, 4) * 5; // 10, 15, 20
    const months = getRandomInt(4, 8); // 4-8 months
    
    // Generate base monthly sales (large number, round for clean math)
    const baseSales = getRandomInt(10, 20) * 100000; // 1,000,000 to 2,000,000
    
    // STEP 2: Calculate correct answer
    const monthlyReturns = Math.round((returnRate / 100) * baseSales);
    const totalReturns = monthlyReturns * months;
    
    // STEP 3: Create distractors based on SAT patterns
    const distractorA = monthlyReturns; // Single month only (forgets to multiply by months)
    const distractorB = monthlyReturns * (months - 1); // Forgets first month
    const distractorD = baseSales * months; // Total sales (ignores return rate completely)
    
    const correctText = totalReturns.toLocaleString();
    
    const optionsData = [
      { text: monthlyReturns.toLocaleString(), isCorrect: false, reason: "represents the number of units returned in just one month, not the full period" },
      { text: (monthlyReturns * (months - 1)).toLocaleString(), isCorrect: false, reason: "only counts the additional months, ignoring the first month" },
      { text: totalReturns.toLocaleString(), isCorrect: true },
      { text: (baseSales * months).toLocaleString(), isCorrect: false, reason: "represents total sales, not returns" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `During the first month of sales, a company sold ${baseSales.toLocaleString()} units of a certain type of smartphone. During the same month, ${returnRate}% of the units sold were returned. If sales and the return rate remain the same for each of the next ${months - 1} months, about how many units of this smartphone will be returned to the company during this ${months}-month period?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To determine the total number of returned units, first calculate the number of units returned in a single month: ${baseSales.toLocaleString()} × 0.${returnRate} = ${monthlyReturns.toLocaleString()}. Since this occurs over ${months} months (${months === 6 ? 'the first month plus the next 5 months' : 'the entire period'}), multiply by ${months}: ${monthlyReturns.toLocaleString()} × ${months} = ${correctText}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: d693f563
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base plants: 35, increase: 60%, result: 56]
 * - Difficulty factors: [Percent increase calculation, adding increase to original]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must calculate increase then add to original, or use multiplier 1.6]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */
