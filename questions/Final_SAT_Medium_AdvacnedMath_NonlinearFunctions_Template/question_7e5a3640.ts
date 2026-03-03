import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 7e5a3640
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth - doubling time calculation
 * - Number ranges: Initial 300000, doubles every 3 hours, after 15 hours
 * - Difficulty: Medium - calculating multiple doubling periods
 */

export const generator_7e5a3640 = {
  metadata: {
    // id: "7e5a3640",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initialAmount = getRandomInt(200000, 400000);
    const doublingPeriod = getRandomInt(2, 5);
    const totalHours = doublingPeriod * 5; // 5 doubling periods
    
    const numDoublings = totalHours / doublingPeriod;
    const finalAmount = initialAmount * Math.pow(2, numDoublings);
    
    const questionText = `Bacteria are growing in a liquid growth medium. There were $${initialAmount.toLocaleString()}$ cells per milliliter during an initial observation. The number of cells per milliliter doubles every $${doublingPeriod}$ hours. How many cells per milliliter will there be $${totalHours}$ hours after the initial observation?`;
    
    const correctAnswer = finalAmount.toLocaleString();
    
    const distractor1 = (initialAmount * numDoublings).toLocaleString(); // Linear growth
    const distractor2 = (initialAmount * Math.pow(2, numDoublings - 1)).toLocaleString(); // One less doubling
    const distractor3 = (initialAmount + finalAmount / 2).toLocaleString(); // Nonsense calculation
    
    const optionsData = [
      { text: distractor1, isCorrect: false, reason: "treats growth as linear instead of exponential" },
      { text: distractor2, isCorrect: false, reason: "uses one fewer doubling period" },
      { text: distractor3, isCorrect: false, reason: "makes calculation error" },
      { text: correctAnswer, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The number of doubling periods is $${totalHours}/${doublingPeriod} = ${numDoublings}$. The final amount is $${initialAmount.toLocaleString()} \\times 2^{${numDoublings}} = ${initialAmount.toLocaleString()} \\times ${Math.pow(2, numDoublings)} = ${finalAmount.toLocaleString()}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: 52e589f9
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Function notation interpretation m(330) ≈ 362
 * - Number ranges: Days 330, mass 362 kg
 * - Difficulty: Medium - interpreting function output in context
 */