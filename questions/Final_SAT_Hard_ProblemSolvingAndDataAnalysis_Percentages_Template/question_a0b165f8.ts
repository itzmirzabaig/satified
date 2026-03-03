import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: a0b165f8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [99, 12.50%]
 * - Difficulty factors: [Reverse percentage problem, careful setup]
 * - Distractor patterns: [Using percentage as absolute, wrong base]
 * - Constraints: [99 = 1.125 * original, so original = 88]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_a0b165f8 = {
  metadata: {
    // id: "a0b165f8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate final count and percentage increase
    let finalCount: number;
    let increasePct: number;
    let multiplier: number;
    let originalCount: number;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Use while loop instead of recursion
    while (attempts < maxAttempts) {
      finalCount = getRandomInt(80, 150);
      increasePct = getRandomInt(8, 25); // 8-25% increase
      multiplier = 1 + increasePct / 100;
      originalCount = Math.round((finalCount / multiplier));
      
      if (Math.abs(originalCount * multiplier - finalCount) <= 0.5) {
        break;
      }
      attempts++;
    }
    
    // Fallback
    if (attempts >= maxAttempts) {
      finalCount = 99;
      increasePct = 12;
      multiplier = 1.125;
      originalCount = 88;
    }
    
    // STEP 3: Create distractors
    const wrongSubtraction = finalCount - Math.round(finalCount * increasePct / 100); // Wrong: subtract pct of final
    const wrongSmall = Math.round(increasePct); // Wrong: using percentage as count
    const wrongDivision = Math.round(finalCount / increasePct); // Wrong: nonsense division
    
    const optionsData = [
      { text: originalCount.toString(), isCorrect: true, reason: "" },
      { text: wrongSubtraction.toString(), isCorrect: false, reason: "incorrectly subtracts percentage of final count" },
      { text: wrongSmall.toString(), isCorrect: false, reason: "confuses percentage with actual count" },
      { text: wrongDivision.toString(), isCorrect: false, reason: "results from incorrect division operation" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'A';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `A scientist studying the life cycle of dragonflies counted the number of dragonflies in a certain habitat each day for 46 days. On February 15, there were ${finalCount} dragonflies in the habitat. The percent increase in the number of dragonflies in the habitat from January 1 to February 15 was ${increasePct}%. How many dragonflies were in the habitat on January 1?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: originalCount.toString(),
      explanation: `Choice ${correctLetter} is correct. Let $x$ be the January 1 count. A ${increasePct}% increase means $x + ${increasePct/100}x = ${finalCount}$, or $${multiplier}x = ${finalCount}$. Solving: $x = \\frac{${finalCount}}{${multiplier}} = ${originalCount}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 040f2a84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [11.70, 80%, 30%]
 * - Difficulty factors: [Chained percentage reversals, multi-step]
 * - Distractor patterns: [Wrong base for each percentage]
 * - Constraints: [Sale = 0.2 * 11.70, sale = 1.3 * cost, so cost = sale/1.3]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - word problem]
 */