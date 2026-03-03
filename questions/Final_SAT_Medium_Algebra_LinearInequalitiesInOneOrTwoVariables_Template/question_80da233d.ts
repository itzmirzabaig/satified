import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 80da233d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [birth weight: 200, gain: 2-3 lbs/day, days: 365]
 * - Difficulty factors: [Compound inequality with multiplication, addition of base value]
 * - Distractor patterns: [A=wrong calculation, B=wrong base, C=forgot birth weight]
 * - Constraints: [200 + 365*2 < w < 200 + 365*3]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_80da233d = {
  metadata: {
    // id: "80da233d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 200 lbs at birth, gain 2-3 lbs/day for 365 days
    // Generate similar: birth weight, daily gain range, days
    const birthWeight = getRandomInt(150, 250); // Birth weight
    const minGain = getRandomInt(1, 3); // Min daily gain
    const maxGain = minGain + getRandomInt(1, 2); // Max daily gain (close to min)
    const days = getRandomInt(300, 400); // Days in period
    
    // STEP 2: Calculate weight range
    const minTotalGain = days * minGain;
    const maxTotalGain = days * maxGain;
    const minWeight = birthWeight + minTotalGain;
    const maxWeight = birthWeight + maxTotalGain;
    
    // STEP 3: Create distractors
    // A: Wrong calculation (maybe just added min/max to birth)
    const distA = `${birthWeight + minGain * 2} < w < ${birthWeight + maxGain * 2}`;
    
    // B: Used wrong base or partial calculation
    const distB = `${birthWeight + minTotalGain / 2} < w < ${birthWeight + maxTotalGain / 2}`;
    
    // C: Forgot birth weight (just the gain)
    const distC = `${minTotalGain} < w < ${maxTotalGain}`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$${distA}$`, isCorrect: false },
      { text: `$${distB}$`, isCorrect: false },
      { text: `$${distC}$`, isCorrect: false },
      { text: `$${minWeight} < w < ${maxWeight}$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. The elephant gains between ${minGain} and ${maxGain} pounds per day for ${days} days, so total gain is between $${days} \\times ${minGain} = ${minTotalGain}$ and $${days} \\times ${maxGain} = ${maxTotalGain}$ pounds. Adding the birth weight of ${birthWeight} pounds gives $${minWeight} < w < ${maxWeight}$. Choice ${incorrectOptions[0].letter} incorrectly calculates the gain. Choice ${incorrectOptions[1].letter} uses incorrect values. Choice ${incorrectOptions[2].letter} is incorrect because it only shows the weight gained and forgets to add the initial birth weight of ${birthWeight} pounds.`;
    
    // STEP 7: Return question data
    return {
      questionText: `A certain elephant weighs $${birthWeight}$ pounds at birth and gains more than $${minGain}$ but less than $${maxGain}$ pounds per day during its first year. Which of the following inequalities represents all possible weights $w$, in pounds, for the elephant $${days}$ days after birth?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${minWeight} < w < ${maxWeight}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: b78cd5df
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [venue fee: 35, per attendee: 10.25, budget: 300]
 * - Difficulty factors: [Real-world rounding down, inequality solving]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [35 + 10.25x ≤ 300, x must be integer]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/b78cd5df.ts