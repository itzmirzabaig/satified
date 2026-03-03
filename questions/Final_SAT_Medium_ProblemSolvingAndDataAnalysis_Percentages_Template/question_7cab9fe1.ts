import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7cab9fe1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 43%, variable: w]
 * - Difficulty factors: [Algebraic expression with percent increase, converting to decimal multiplier]
 * - Distractor patterns: [B: decrease (1-0.43), C: multiply by 43 (forgot decimal), D: just the increase (0.43w)]
 * - Constraints: [Correct form is 1.43w = w + 0.43w]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_7cab9fe1 = {
  metadata: {
    // id: "7cab9fe1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 43% - use various percentages 25-75 range
    const percent = getRandomInt(3, 7) * 5 + getRandomInt(0, 1) * 5; // 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75
    
    // STEP 2: Create options
    const decimal = (percent / 100).toFixed(2).replace(/\.?0+$/, ''); // Clean decimal format
    const multiplier = (1 + percent / 100).toFixed(2).replace(/\.?0+$/, '');
    
    const correctText = `${multiplier}w`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `${(1 - percent/100).toFixed(2).replace(/\.?0+$/, '')}w`, isCorrect: false, reason: "represents a decrease rather than an increase" },
      { text: `${percent}w`, isCorrect: false, reason: "represents multiplying by the percentage value rather than the decimal equivalent" },
      { text: `${decimal}w`, isCorrect: false, reason: "represents only the increase, not the total new amount" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `Which expression represents the result of increasing a positive quantity $w$ by ${percent}%?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To find the result of increasing a quantity $w$ by ${percent}\\%, add the increase to the original amount. The increase is ${percent}\\% of $w$, or $${decimal}w$. The new quantity is $w + ${decimal}w = ${multiplier}w$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: 121dc44f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [increase: 7%, multiplier: 1.07]
 * - Difficulty factors: [Converting percent increase to multiplier factor]
 * - Distractor patterns: [A: 0.07 (just the rate), B: 0.7 (decimal error), D: 1.7 (70% instead of 7%)]
 * - Constraints: [k = 1 + percent/100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
