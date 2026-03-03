import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 25faa756
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [60%, 45%]
 * - Difficulty factors: [Sequential percentage changes, final ratio]
 * - Distractor patterns: [Same as 67c0200a, 20845d36]
 * - Constraints: [a = 1.6b, c = 0.55a, so c = 0.88b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_25faa756 = {
  metadata: {
    // id: "25faa756",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate percentages
    const P1 = getRandomInt(40, 80); // a is P1% greater than b
    const P2 = getRandomInt(30, 60); // c is P2% less than a
    
    // STEP 2: Calculate multipliers
    const aMultiplier = 1 + P1 / 100;
    const cMultiplier = 1 - P2 / 100;
    const finalRatio = Math.round(aMultiplier * cMultiplier * 100) / 100;
    
    return {
      questionText: `The number $a$ is ${P1}% greater than the positive number $b$. The number $c$ is ${P2}% less than $a$. The number $c$ is how many times $b$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: finalRatio.toString(),
      explanation: `It's given that $a$ is ${P1}% greater than $b$. Therefore, $a = (1 + \\frac{${P1}}{100})b = ${aMultiplier}b$. It's also given that $c$ is ${P2}% less than $a$. Therefore, $c = (1 - \\frac{${P2}}{100})a = ${cMultiplier}a$. Substituting: $c = ${cMultiplier}(${aMultiplier}b) = ${finalRatio}b$. Thus, $c$ is ${finalRatio} times $b$.`
    };
  }
};

/**
 * Question ID: ad911622
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [167%, 16%]
 * - Difficulty factors: [Compound percentage changes with increase then decrease]
 * - Distractor patterns: [Adding percentages, wrong order of operations]
 * - Constraints: [Final = 1.67 * 0.84 = 1.4028, net increase = 40.28%]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - compound percentage problem]
 */