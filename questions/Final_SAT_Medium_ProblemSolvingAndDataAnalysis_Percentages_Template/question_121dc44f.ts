import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_121dc44f = {
  metadata: {
    // id: "121dc44f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 7% - use single-digit percentages for variation
    const percent = getRandomInt(3, 9); // 3% to 9%
    
    // STEP 2: Create options
    const rateDecimal = (percent / 100).toFixed(2).replace(/^0\./, '0.'); // 0.07
    const multiplier = (1 + percent / 100).toFixed(2).replace(/\.?0+$/, ''); // 1.07
    
    const correctText = multiplier;
    
    const optionsData = [
      { text: rateDecimal, isCorrect: false, reason: "represents only the rate of increase, not the total multiplier" },
      { text: (percent / 10).toFixed(1), isCorrect: false, reason: "represents a decimal point error" },
      { text: correctText, isCorrect: true },
      { text: (1 + percent / 10).toFixed(1), isCorrect: false, reason: `represents a ${percent}0% increase rather than ${percent}%` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `The population of City A increased by ${percent}\\% from 2015 to 2016. If the 2016 population is $k$ times the 2015 population, what is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Let $P_{2015}$ be the population of City A in 2015. The population increased by ${percent}\\% from 2015 to 2016. The population in 2016 is $P_{2015} + \\frac{${percent}}{100}P_{2015} = ${multiplier}P_{2015}$. Since $P_{2016} = k \\cdot P_{2015}$, it follows that $k = ${multiplier}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: 8a714fa1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 9%, correct: 1.09x]
 * - Difficulty factors: [Same as 7cab9fe1 - percent increase expression]
 * - Distractor patterns: [B: just 0.09x (the increase), C: x+9 (adding 9 instead of 9%), D: x+0.09 (adding number not percent)]
 * - Constraints: [Must use 1 + percent/100 format]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
