import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d72a2b4d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [March: $15.50, April: $17.36, p: 112]
 * - Difficulty factors: [Finding percent p where April = p% of March, p > 100 means increase]
 * - Distractor patterns: [A: 12 (just the increase percent), B: 88 (decrease confusion), D: 188 (random)]
 * - Constraints: [p = (April/March) * 100]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_d72a2b4d = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const marchPrice = getRandomInt(10, 30) + (getRandomInt(0, 99) / 100);
    const percentIncrease = getRandomInt(5, 25);
    const aprilPrice = Math.round(marchPrice * (1 + percentIncrease / 100) * 100) / 100;
    
    // STEP 2: Calculate answer
    const p = Math.round((aprilPrice / marchPrice) * 100);
    
    // STEP 3: Create distractors
    const distractorA = percentIncrease;
    const distractorB = Math.round(100 - percentIncrease);
    const distractorD = p + getRandomInt(50, 100);
    
    const correctText = p.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "represents the percentage increase only, not the total percentage value" },
      { text: distractorB.toString(), isCorrect: false, reason: "implies a decrease, but the price increased" },
      { text: correctText, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "calculation error" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data
    return {
      // FIXED: Changed $p% to $p\\%$ (percent inside math mode with proper escape)
      // Also fixed the dollar signs - they were missing escape for the literal $ symbol
      questionText: `In March, the price of a collectible card was ${marchPrice.toFixed(2)}. In April, the price of the collectible card was ${aprilPrice.toFixed(2)}. The price of the collectible card in April was $p\\%$ of the price of the collectible card in March. What is the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The equation is $${aprilPrice.toFixed(2)} = \\frac{p}{100} \\times ${marchPrice.toFixed(2)}$. Solving for $p$: $p = \\frac{${aprilPrice.toFixed(2)} \\times 100}{${marchPrice.toFixed(2)}} = ${correctText}$. This means the April price was ${correctText}\\% of the March price, or a ${percentIncrease}\\% increase. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};