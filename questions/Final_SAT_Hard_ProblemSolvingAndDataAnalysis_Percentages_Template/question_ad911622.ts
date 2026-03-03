import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: ad911622
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [167%, 16%]
 * - Difficulty factors: [Compound percentage changes with increase then decrease]
 * - Distractor patterns: [Adding percentages, wrong order of operations]
 * - Constraints: [Final = 1.67 * 0.84 = 1.4028, net increase = 40.28%]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - compound percentage problem]
 */

export const generator_ad911622 = {
  metadata: {
    // id: "ad911622",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate increase and decrease percentages
    const increasePct = getRandomInt(120, 200); // Large increase
    const decreasePct = getRandomInt(10, 30);   // Moderate decrease
    
    // STEP 2: Calculate compound effect
    const multiplier1 = 1 + increasePct / 100;
    const multiplier2 = 1 - decreasePct / 100;
    const finalMultiplier = multiplier1 * multiplier2;
    const netIncreasePct = Math.round((finalMultiplier - 1) * 10000) / 100;
    
    // STEP 3: Create distractors
    const additiveError = increasePct - decreasePct; // Wrong: additive
    const wrongOrder = (1 + decreasePct/100) * (1 - increasePct/100); // Wrong: reversed
    const wrongCalc = increasePct + decreasePct; // Wrong: simple addition
    
    const optionsData = [
      { text: netIncreasePct.toFixed(2) + "\\%", isCorrect: true, reason: "" },
      { text: (Math.abs(wrongOrder - 1) * 100).toFixed(2) + "\\%", isCorrect: false, reason: "results from reversing the operations" },
      { text: additiveError.toFixed(2) + "\\%", isCorrect: false, reason: "results from subtracting percentages instead of compounding" },
      { text: wrongCalc.toFixed(2) + "\\%", isCorrect: false, reason: "results from adding percentages" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'A';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The value of a collectible comic book increased by ${increasePct}% from the end of $2011$ to the end of $2012$ and then decreased by ${decreasePct}% from the end of $2012$ to the end of $2013$. What was the net percentage increase in the value of the collectible comic book from the end of $2011$ to the end of $2013$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: netIncreasePct.toFixed(2) + "%",
      explanation: `Choice ${correctLetter} is correct. After the increase: value = ${multiplier1} × original. After the decrease: value = ${multiplier2} × ${multiplier1} × original = ${finalMultiplier.toFixed(4)} × original. Net increase = (${finalMultiplier.toFixed(4)} - 1) × 100\\% = ${netIncreasePct.toFixed(2)}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};