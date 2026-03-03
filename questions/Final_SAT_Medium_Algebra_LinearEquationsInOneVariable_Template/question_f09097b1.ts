import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f09097b1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growth rate: 1.20, days: 12, final height: 36.8]
 * - Difficulty factors: [Word problem setup, working backwards from final value]
 * - Distractor patterns: [None - fill in blank, but common errors include using wrong number of days]
 * - Constraints: [Initial = Final - (rate × days)]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_f09097b1 = {
  metadata: {
    // id: "f09097b1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const growthRate = (getRandomInt(8, 20) / 10); // 0.8 to 2.0
    const days = getRandomInt(8, 20);
    const initialHeight = (getRandomInt(15, 35) / 10) * 10; // Clean number
    const totalGrowth = growthRate * days;
    const finalHeight = initialHeight + totalGrowth;
    
    const correctAnswer = initialHeight.toFixed(1);
    
    return {
      questionText: `An agricultural scientist studying the growth of corn plants recorded the height of a corn plant at the beginning of a study and the height of the plant each day for the next ${days} days. The scientist found that the height of the plant increased by an average of ${growthRate.toFixed(2)} centimeters per day for the ${days} days. If the height of the plant on the last day of the study was ${finalHeight.toFixed(1)} centimeters, what was the height, in centimeters, of the corn plant at the beginning of the study?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. If the height of the plant increased by an average of ${growthRate.toFixed(2)} centimeters per day for ${days} days, then its total growth over the ${days} days was $(${growthRate.toFixed(2)})(${days}) = ${totalGrowth.toFixed(1)}$ centimeters. The plant was ${finalHeight.toFixed(1)} centimeters tall after ${days} days, so at the beginning of the study its height was $${finalHeight.toFixed(1)} - ${totalGrowth.toFixed(1)} = ${correctAnswer}$ centimeters.`
    };
  }
};

/**
 * Question ID: bf749912
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/3, 1/2, result: -8, solution: 42]
 * - Difficulty factors: [Working with fractions, factoring common binomial]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Equation has common factor (x+6) that can be factored out]
 * - Question type: [Fill-in-the-blank]
 */