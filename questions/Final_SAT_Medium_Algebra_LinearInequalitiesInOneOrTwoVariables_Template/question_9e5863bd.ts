import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9e5863bd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min rate: 0.6, max rate: 1.8 (single decimal)]
 * - Difficulty factors: [Range interpretation, compound inequality construction]
 * - Distractor patterns: [A=summed values, B=only max, C=wrong range direction]
 * - Constraints: [Must be compound inequality 0.6 ≤ s ≤ 1.8]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9e5863bd = {
  metadata: {
    // id: "9e5863bd",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original uses 0.6 and 1.8 (single decimal place, 0.6-1.8 range)
    const minRate = getRandomInt(1, 8) / 10; // 0.1 to 0.8
    const maxRate = minRate + getRandomInt(10, 30) / 10; // Ensure max > min with reasonable gap
    
    // Round to 1 decimal place
    const minVal = Math.round(minRate * 10) / 10;
    const maxVal = Math.round(maxRate * 10) / 10;
    
    const context = getRandomElement([
      "snowstorm", "rainstorm", "windstorm", "hailstorm"
    ]);
    
    const measurement = getRandomElement([
      "inches per hour", "centimeters per hour", "millimeters per hour"
    ]);
    
    // STEP 2: Create distractors based on SAT error patterns
    const distractorA = `${minVal + maxVal}`; // Summed values (common error)
    const distractorB = `${maxVal}`; // Only maximum
    const distractorC = `0 \\leq s \\leq ${minVal}`; // Wrong range (reversed logic)
    
    // STEP 3: Create options with tracking
    const optionsData = [
      { text: `$s \\geq ${distractorA}$`, isCorrect: false },
      { text: `$s \\geq ${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${minVal} \\leq s \\leq ${maxVal}$`, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. The minimum rate recorded was ${minVal} ${measurement}, so $s \\geq ${minVal}$. The maximum rate recorded was ${maxVal} ${measurement}, so $s \\leq ${maxVal}$. Combining these gives ${minVal} \\leq s \\leq ${maxVal}. Choice ${incorrectOptions[0].letter} is incorrect because it sums the min and max values. Choice ${incorrectOptions[1].letter} is incorrect because it only uses the maximum value. Choice ${incorrectOptions[2].letter} is incorrect because it reverses the range logic.`;
    
    // STEP 6: Return question data
    return {
      questionText: `For a ${context} in a certain town, the minimum rate of ${context === 'snowstorm' ? 'snowfall' : context === 'rainstorm' ? 'rainfall' : context === 'windstorm' ? 'wind speed' : 'hail accumulation'} recorded was $${minVal}$ ${measurement}, and the maximum rate recorded was $${maxVal}$ ${measurement}. Which inequality is true for all values of $s$, where $s$ represents the rate of ${context === 'snowstorm' ? 'snowfall' : context === 'rainstorm' ? 'rainfall' : context === 'windstorm' ? 'wind speed' : 'hail accumulation'}, in ${measurement}, recorded for this ${context}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${minVal} \\leq s \\leq ${maxVal}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 64c85440
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min width: 7.5, max width: 9.0, curb length: 135]
 * - Difficulty factors: [Inverse relationship, division with decimals, compound inequality]
 * - Distractor patterns: [A=wrong variable range, B=width range not count, C=equated curb length with max spaces]
 * - Constraints: [n must satisfy 135/9 ≤ n ≤ 135/7.5]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/64c85440.ts