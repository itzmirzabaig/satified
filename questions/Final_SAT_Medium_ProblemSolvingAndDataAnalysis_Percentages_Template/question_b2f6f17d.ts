import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b2f6f17d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [original: $75.74, new: $79.86, increase: $4.12, percent: 5.4%]
 * - Difficulty factors: [Percent increase with decimals, rounding to nearest tenth]
 * - Distractor patterns: [A: 4.1% (confusing dollar amount with percent), B: 5.1% (calculation error), C: 5.2% (rounding error)]
 * - Constraints: [(new - old) / old * 100, round to 1 decimal]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_b2f6f17d = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const originalBill = getRandomInt(50, 100) + (getRandomInt(0, 99) / 100);
    const percentIncrease = getRandomInt(4, 8) + (getRandomInt(0, 9) / 10);
    
    const increaseAmount = originalBill * (percentIncrease / 100);
    const newBill = originalBill + increaseAmount;
    
    const roundedNewBill = Math.round(newBill * 100) / 100;
    const roundedOriginal = Math.round(originalBill * 100) / 100;
    
    // STEP 2: Calculate correct answer
    const actualIncrease = roundedNewBill - roundedOriginal;
    const calculatedPercent = (actualIncrease / roundedOriginal) * 100;
    const roundedPercent = Math.round(calculatedPercent * 10) / 10;
    
    // STEP 3: Create distractors
    const distractorA = Math.round(actualIncrease * 10) / 10;
    const distractorB = Math.round((roundedPercent - 0.3) * 10) / 10;
    const distractorC = Math.round((roundedPercent + 0.2) * 10) / 10;
    
    // FIXED: Use \% (single backslash) for percent sign in LaTeX math mode
    const correctText = `${roundedPercent.toFixed(1)}\\%`;
    
    const optionsData = [
      { text: `${distractorA.toFixed(1)}\\%`, isCorrect: false, reason: "confuses the dollar amount of the increase with the percentage" },
      { text: `${distractorB.toFixed(1)}\\%`, isCorrect: false, reason: "calculation error" },
      { text: `${distractorC.toFixed(1)}\\%`, isCorrect: false, reason: "rounding error" },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    // FIXED: Use \\% inside math mode, plain % outside
    return {
      questionText: `A customer's monthly water bill was ${roundedOriginal.toFixed(2)}. Due to a rate increase, her monthly bill is now ${roundedNewBill.toFixed(2)}. To the nearest tenth of a percent, by what percent did the amount of the customer's water bill increase?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The percent increase is $\\frac{${roundedNewBill.toFixed(2)} - ${roundedOriginal.toFixed(2)}}{${roundedOriginal.toFixed(2)}} \\times 100 = \\frac{${actualIncrease.toFixed(2)}}{${roundedOriginal.toFixed(2)}} \\times 100 \\approx ${roundedPercent.toFixed(1)}\\%$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};