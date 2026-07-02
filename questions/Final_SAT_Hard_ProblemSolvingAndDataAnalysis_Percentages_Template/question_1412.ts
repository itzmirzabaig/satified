import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1412
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1.27, p%]
 * - Difficulty factors: [Inverse percentage relationship, rounding]
 * - Distractor patterns: [Using 1.27 directly, wrong rounding]
 * - Constraints: [2018 = 1.27 * 2014, so 2014 = 100/127 * 2018 ≈ 78.74%]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1412 = {
  metadata: {
    id: "1412",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate growth factor (1.10 to 1.40 range)
    const growthFactor = getRandomInt(110, 140) / 100;
    
    // STEP 2: Calculate inverse percentage
    const inverseRatio = 1 / growthFactor;
    const percentageP = Math.round(inverseRatio * 100);
    
    return {
      questionText: `The number of zebras in a population in 2018 was ${growthFactor.toFixed(2)} times the number of zebras in this population in 2014. If the number of zebras in this population in 2014 is $p% of the number of zebras in this population in 2018, what is the value of $p$, to the nearest whole number?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: percentageP.toString(),
      explanation: `Let $x$ be the 2014 population and $y$ be the 2018 population. Given $y = ${growthFactor}x$. Dividing: $x = \\frac{y}{${growthFactor}} = ${inverseRatio.toFixed(4)}...y$. As a percentage: $${inverseRatio.toFixed(4)}... × 100 ≈ ${percentageP}% (to the nearest whole number).`
    };
  }
};
