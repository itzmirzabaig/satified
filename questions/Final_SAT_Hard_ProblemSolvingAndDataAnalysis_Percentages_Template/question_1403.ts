import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1403
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [70%, 60% (similar to 67c0200a but different values)]
 * - Difficulty factors: [Sequential percentage changes, calculation precision]
 * - Distractor patterns: [Same as 67c0200a]
 * - Constraints: [a = 0.3b, c = 1.6a, so c = 0.48b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_1403 = {
  metadata: {
    id: "1403",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random percentages (different ranges than 67c0200a)
    const P1 = getRandomInt(50, 75); // a is P1% less than b
    const P2 = getRandomInt(40, 80); // c is P2% greater than a
    
    // STEP 2: Calculate multipliers
    const aMultiplier = 1 - P1 / 100;
    const cMultiplier = 1 + P2 / 100;
    const finalRatio = Math.round(aMultiplier * cMultiplier * 100) / 100;
    
    return {
      questionText: `The number $a$ is ${P1}% less than the positive number $b$. The number $c$ is ${P2}% greater than $a$. The number $c$ is how many times $b$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: finalRatio.toString(),
      explanation: `It's given that $a$ is ${P1}% less than $b$. Therefore, $a = (1 - \\frac{${P1}}{100})b = ${aMultiplier}b$. It's also given that $c$ is ${P2}% greater than $a$. Therefore, $c = (1 + \\frac{${P2}}{100})a = ${cMultiplier}a$. Substituting: $c = ${cMultiplier}(${aMultiplier}b) = ${finalRatio}b$. Thus, $c$ is ${finalRatio} times $b$.`
    };
  }
};
