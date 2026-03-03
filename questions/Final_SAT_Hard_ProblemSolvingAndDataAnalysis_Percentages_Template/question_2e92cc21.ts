import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 2e92cc21
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [110%, 90%, 47]
 * - Difficulty factors: [Chained "greater than" and "less than" calculations]
 * - Distractor patterns: [Sign errors, decimal errors]
 * - Constraints: [b = 0.1 * 47, a = 2.1 * b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_2e92cc21 = {
  metadata: {
    // id: "2e92cc21",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random parameters
    const P1 = getRandomInt(80, 150); // a is P1% greater than b
    const P2 = getRandomInt(70, 95);  // b is P2% less than base
    const baseValue = getRandomInt(30, 80);
    
    // STEP 2: Calculate values
    const bValue = Math.round(baseValue * (1 - P2 / 100) * 100) / 100;
    const aMultiplier = 1 + P1 / 100;
    const aValue = Math.round(bValue * aMultiplier * 100) / 100;
    
    return {
      questionText: `The number $a$ is ${P1}% greater than the number $b$. The number $b$ is ${P2}% less than ${baseValue}. What is the value of $a$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: aValue.toString(),
      explanation: `It's given that $b$ is ${P2}% less than ${baseValue}. Therefore, $b = (1 - \\frac{${P2}}{100})(${baseValue}) = ${1 - P2/100} × ${baseValue} = ${bValue}$. It's also given that $a$ is ${P1}% greater than $b$. Therefore, $a = (1 + \\frac{${P1}}{100})b = ${aMultiplier} × ${bValue} = ${aValue}$.`
    };
  }
};

/**
 * Question ID: ba0e23b0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [140, 10]
 * - Difficulty factors: ["Percent greater than" formulation]
 * - Distractor patterns: [Confusing percentage with absolute difference]
 * - Constraints: [140 = (1 + p/100) * 10, so p = 1300]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */