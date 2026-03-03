import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 67c0200a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [70%, 80% (medium-high percentages)]
 * - Difficulty factors: [Sequential percentage changes, "less than" vs "greater than"]
 * - Distractor patterns: [Sign errors in final calculation, order of operations]
 * - Constraints: [a = 0.3b, c = 1.8a, so c = 0.54b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_67c0200a = {
  metadata: {
    // id: "67c0200a",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random percentages
    const P1 = getRandomInt(60, 80); // a is P1% less than b
    const P2 = getRandomInt(60, 100); // c is P2% greater than a
    
    // STEP 2: Calculate multipliers
    const aMultiplier = 1 - P1 / 100; // a = multiplier * b
    const cMultiplier = 1 + P2 / 100; // c = multiplier * a
    const finalRatio = Math.round(aMultiplier * cMultiplier * 100) / 100; // c as multiple of b
    
    // STEP 3: Format answer (handle decimals and fractions)
    const numerator = Math.round((100 - P1) * (100 + P2));
    const denominator = 10000;
    
    return {
      questionText: `The number $a$ is ${P1}% less than the positive number $b$. The number $c$ is ${P2}% greater than $a$. The number $c$ is how many times $b$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: finalRatio.toString(),
      explanation: `It's given that $a$ is ${P1}% less than $b$. Therefore, $a = (1 - \\frac{${P1}}{100})b = ${aMultiplier}b$. It's also given that $c$ is ${P2}% greater than $a$. Therefore, $c = (1 + \\frac{${P2}}{100})a = ${cMultiplier}a$. Substituting: $c = ${cMultiplier}(${aMultiplier}b) = ${finalRatio}b$. Thus, $c$ is ${finalRatio} times $b$.`
    };
  }
};

/**
 * Question ID: 40e7a1a9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [210, 30 (integers)]
 * - Difficulty factors: ["Percent greater than" formulation, algebraic setup]
 * - Distractor patterns: [Simple division error, off-by-one errors]
 * - Constraints: [210 = (1 + p/100) * 30, solve for p]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */