import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 5267c3c7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [400%, 60 (result)]
 * - Difficulty factors: ["Increasing by" vs "of", algebraic setup]
 * - Distractor patterns: [Treating as multiplication, forgetting to add original]
 * - Constraints: [x + 4x = 60, so 5x = 60, x = 12]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_5267c3c7 = {
  metadata: {
    // id: "5267c3c7",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate percentage increase and result
    const increasePct = getRandomInt(200, 600); // 200% to 600%
    let result: number;
    let multiplier: number;
    let originalValue: number;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Use while loop instead of recursion to ensure clean division
    while (attempts < maxAttempts) {
      result = getRandomInt(30, 120);
      multiplier = 1 + increasePct / 100;
      originalValue = result / multiplier;
      
      if (originalValue === Math.floor(originalValue)) {
        break;
      }
      attempts++;
    }
    
    // Fallback if no valid value found
    if (attempts >= maxAttempts) {
      result = 60;
      multiplier = 1 + increasePct / 100;
      originalValue = result / multiplier;
    }
    
    // STEP 3: Create distractors
    const forgotOriginal = Math.round(result / (increasePct / 100)); // Wrong: x * P/100 = result
    const multiplied = result * multiplier; // Wrong: result * multiplier
    const divided = result / (increasePct / 100); // Wrong: simple division
    
    const optionsData = [
      { text: Math.round(originalValue).toString(), isCorrect: true, reason: "" },
      { text: Math.round(forgotOriginal).toString(), isCorrect: false, reason: "results from forgetting to include the original amount" },
      { text: Math.round(multiplied).toString(), isCorrect: false, reason: "results from multiplying instead of dividing" },
      { text: Math.round(divided).toString(), isCorrect: false, reason: "results from incorrect division" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'A';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The result of increasing the quantity $x$ by ${increasePct}% is ${result}. What is the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: Math.round(originalValue).toString(),
      explanation: `Choice ${correctLetter} is correct. Increasing $x$ by ${increasePct}% means $x + \\frac{${increasePct}}{100}x = ${result}$, or $(1 + ${increasePct/100})x = ${result}$. Thus $${multiplier}x = ${result}$, so $x = \\frac{${result}}{${multiplier}} = ${Math.round(originalValue)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 20845d36
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [70%, 60% (similar to 67c0200a but different values)]
 * - Difficulty factors: [Sequential percentage changes, calculation precision]
 * - Distractor patterns: [Same as 67c0200a]
 * - Constraints: [a = 0.3b, c = 1.6a, so c = 0.48b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */