import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_8a714fa1 = {
  metadata: {
    // id: "8a714fa1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 9% - single digit variation
    const percent = getRandomInt(5, 15); // 5% to 15%
    
    // STEP 2: Create options
    const decimal = (percent / 100).toFixed(2).replace(/\.?0+$/, '');
    const multiplier = (1 + percent / 100).toFixed(2).replace(/\.?0+$/, '');
    
    const correctText = `${multiplier}x`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `${decimal}x`, isCorrect: false, reason: `represents only ${percent}% of the quantity, which would be a ${100 - percent}% decrease` },
      { text: `x+${percent}`, isCorrect: false, reason: `adds the number ${percent} rather than ${percent}% of x` },
      { text: `x+${(percent/100).toFixed(2)}`, isCorrect: false, reason: `adds the decimal ${(percent/100).toFixed(2)} rather than ${percent}% of x` }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Return question data
    return {
      questionText: `Which of the following represents the result of increasing the quantity $x$ by ${percent}%, where $x>0$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. To increase $x$ by ${percent}\\%, calculate the increase (${percent}\\% of $x$ = $${decimal}x$) and add to the original: $x + ${decimal}x = ${multiplier}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
/**
 * Question ID: 8e2e424e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 50, percent greater: 36%, multiplier: 1.36]
 * - Difficulty factors: [Finding multiplier r where k = 50 * r and k is 36% greater than 50]
 * - Distractor patterns: [A: 36 (raw percent), B: 3.6 (decimal error), D: 0.36 (just the increase portion)]
 * - Constraints: [r = 1 + percent/100 = 1.36]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */
