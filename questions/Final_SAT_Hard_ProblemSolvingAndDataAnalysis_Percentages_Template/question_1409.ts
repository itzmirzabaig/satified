import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1409
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [210, 30 (integers)]
 * - Difficulty factors: ["Percent greater than" formulation, algebraic setup]
 * - Distractor patterns: [Simple division error, off-by-one errors]
 * - Constraints: [210 = (1 + p/100) * 30, solve for p]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1409 = {
  metadata: {
    id: "1409",  // FIXED: Was "40e7a9" in original, now matches comment
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base value and multiplier
    const baseValue = getRandomInt(15, 45); // Original number
    const multiplier = getRandomInt(5, 15); // Result is multiplier times base
    
    // STEP 2: Calculate result and percentage
    const result = baseValue * multiplier;
    const percentGreater = (multiplier - 1) * 100;
    
    return {
      questionText: `${result} is $p$% greater than ${baseValue}. What is the value of $p$?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: percentGreater.toString(),
      explanation: `It's given that ${result} is $p$% greater than ${baseValue}. This means $\\left(1 + \\frac{p}{100}\\right)(${baseValue}) = ${result}$. Dividing both sides by ${baseValue} gives $\\frac{p}{100} + 1 = \\frac{${result}}{${baseValue}}$, which is $\\frac{p}{100} + 1 = ${multiplier}$. Subtracting 1 from both sides gives $\\frac{p}{100} = ${multiplier - 1}$. Multiplying both sides by 100 gives $p = ${percentGreater}$.`
    };
  }
};
