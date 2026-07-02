import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1417
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1800%, 684 (large percentage, mid-range result)]
 * - Difficulty factors: [Very large percentage increase, careful algebraic setup]
 * - Distractor patterns: [Dividing by 18 instead of 19, multiplying instead of dividing]
 * - Constraints: [x + 18x = 684, so 19x = 684, x = 36]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1417 = {
  metadata: {
    id: "1417",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate large percentage increase and result
    const increasePct = getRandomInt(1000, 2500); // Very large percentage
    let result: number;
    let multiplier: number;
    let originalValue: number;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Use while loop instead of recursion
    while (attempts < maxAttempts) {
      result = getRandomInt(300, 900);
      multiplier = 1 + increasePct / 100;
      originalValue = result / multiplier;
      
      if (originalValue === Math.floor(originalValue) && originalValue >= 10) {
        break;
      }
      attempts++;
    }
    
    // Fallback
    if (attempts >= maxAttempts) {
      result = 684;
      multiplier = 1 + increasePct / 100;
      originalValue = result / multiplier;
    }
    
    // STEP 3: Create distractors
    const wrongDivisor = Math.round(result / (increasePct / 100)); // Divide by 18 instead of 19
    const multipliedByMult = Math.round(result * multiplier); // Multiply instead of divide
    const wrongCalculation = Math.round(result - increasePct); // Nonsense calculation
    
    const optionsData = [
      { text: wrongCalculation.toString(), isCorrect: false, reason: "results from incorrect arithmetic" },
      { text: multipliedByMult.toString(), isCorrect: false, reason: "results from multiplying instead of dividing" },
      { text: wrongDivisor.toString(), isCorrect: false, reason: "results from dividing by the percentage decimal instead of (1 + percentage decimal)" },
      { text: Math.round(originalValue).toString(), isCorrect: true, reason: "" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'D';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The result of increasing the quantity $x$ by ${increasePct}% is ${result}. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: Math.round(originalValue).toString(),
      explanation: `Choice ${correctLetter} is correct. Increasing $x$ by ${increasePct}% means $x + \\frac{${increasePct}}{100}x = ${result}$. Since $\\frac{${increasePct}}{100} = ${increasePct/100}$, we have $x + ${increasePct/100}x = ${result}$, or ${multiplier}x = ${result}$. Thus $x = \\frac{${result}}{${multiplier}} = ${Math.round(originalValue)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
