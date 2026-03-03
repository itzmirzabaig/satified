import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 20845d36
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [70%, 60% (similar to 67c0200a but different values)]
 * - Difficulty factors: [Sequential percentage changes, calculation precision]
 * - Distractor patterns: [Same as 67c0200a]
 * - Constraints: [a = 0.3b, c = 1.6a, so c = 0.48b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_20845d36 = {
  metadata: {
    // id: "20845d36",
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

/**
 * Question ID: 86684ce9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1800%, 684 (large percentage, mid-range result)]
 * - Difficulty factors: [Very large percentage increase, careful algebraic setup]
 * - Distractor patterns: [Dividing by 18 instead of 19, multiplying instead of dividing]
 * - Constraints: [x + 18x = 684, so 19x = 684, x = 36]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */