import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 05195d8a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 80% (high percentage), faulty items: 88 (double-digit), total: 110]
 * - Difficulty factors: [Solving percent equation for the whole given the part]
 * - Distractor patterns: [N/A - fill in blank, but common errors: wrong equation setup, divide by wrong value]
 * - Constraints: [Part/whole relationship: part = percent * whole]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure - conceptual question]
 */

export const generator_05195d8a = {
  metadata: {
    // id: "05195d8a",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - original uses 80% and 88 faulty items
    // Keep percentage as a "nice" percentage (ends in 0 or 5, reasonable range 60-90%)
    const percent = getRandomInt(6, 9) * 10; // 60, 70, 80, 90
    // Generate total first, then calculate faulty to ensure clean division
    const total = getRandomInt(10, 20) * 5; // 50, 55, 60, ..., 100 - divisible by 5 for clean math
    const faultyItems = Math.round((percent / 100) * total);
    
    // Ensure we get a reasonable double-digit number like the original (88)
    // Adjust total if needed to get faulty items in 50-150 range
    const adjustedTotal = Math.ceil(faultyItems * 100 / percent);
    const finalFaulty = Math.round((percent / 100) * adjustedTotal);
    const finalTotal = adjustedTotal;
    
    // STEP 2: Calculate answer
    // Equation: (percent/100) * total = faultyItems
    // total = faultyItems * 100 / percent
    const correctAnswer = (finalFaulty * 100 / percent).toString();
    
    // STEP 3: Return question data
    return {
      questionText: `In a sample, ${percent}\\% of the items are faulty. There are ${finalFaulty} faulty items in the sample. How many total items are in the sample?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Let \\( x \\) represent the total number of items in the sample. It's given that ${percent}\\% of the items are faulty and that there are ${finalFaulty} faulty items in the sample. Therefore, ${percent}\\% of \\( x \\) is ${finalFaulty}. Since ${percent}\\% can be rewritten as \\( \\frac{${percent}}{100} \\), it follows that \\( \\frac{${percent}}{100} x=${finalFaulty} \\). Multiplying both sides of this equation by 100 yields ${percent}x=${finalFaulty * 100}. Dividing both sides of this equation by ${percent} yields \\( x=${correctAnswer} \\). Therefore, there are ${correctAnswer} total items in the sample.`
    };
  }
};
/**
 * Question ID: 022e9894
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 1,250 (mid-large), first filter: 72%, second filter: 36%]
 * - Difficulty factors: [Sequential percentage application, multi-step calculation]
 * - Distractor patterns: [N/A - fill in blank, but common: stop at first step, add instead of multiply]
 * - Constraints: [Must apply percentages sequentially, not add them]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [No figure]
 */
