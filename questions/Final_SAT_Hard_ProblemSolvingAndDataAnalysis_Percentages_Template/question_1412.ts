import { getRandomInt } from '../../utils/math';
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
    // STEP 1: Generate growth factor (1.10 to 1.40 range). Kept to exactly two
    // decimals so ${growthFactor} never prints a float artifact.
    const factorPercent = getRandomInt(110, 140); // e.g. 134 -> 1.34
    const growthFactor = factorPercent / 100;

    // STEP 2: The 2014 population is (1 / growthFactor) of the 2018 population.
    // p is that ratio as a percent, rounded to the nearest whole number.
    const exactPercent = 100 / growthFactor;                 // e.g. 74.626...
    const percentTwoDp = Math.round(exactPercent * 100) / 100; // e.g. 74.63
    const percentageP = Math.round(exactPercent);             // e.g. 75

    return {
      questionText: `The number of zebras in a population in 2018 was ${growthFactor.toFixed(2)} times the number of zebras in this population in 2014. If the number of zebras in this population in 2014 is $p$% of the number of zebras in this population in 2018, what is the value of $p$, to the nearest whole number?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: percentageP.toString(),
      explanation: `Let $x$ be the number of zebras in 2014 and $y$ be the number of zebras in 2018. It is given that $y = ${growthFactor}x$. Solving for $x$ gives $x = \\frac{y}{${growthFactor}}$, so $x$ is $\\frac{1}{${growthFactor}}$ of $y$. As a percentage, $\\frac{100}{${growthFactor}} \\approx ${percentTwoDp}$, which rounds to $p = ${percentageP}$ to the nearest whole number.`
    };
  }
};
