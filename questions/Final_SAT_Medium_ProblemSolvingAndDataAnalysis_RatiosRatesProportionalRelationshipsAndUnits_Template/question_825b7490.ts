import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 825b7490
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [first ratio term: 140, second ratio term: m, equivalent ratio 4:28]
 * - Difficulty factors: [Ratio equivalence, solving for unknown in proportion]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_825b7490 = {
  metadata: {
    // id: "825b7490",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 140 to m = 4 to 28
    // We need: a to m = b to c, where a/b = m/c → m = a*c/b
    
    // Ensure integer result: pick b that divides evenly into a*c
    const b = getRandomInt(2, 8); // small number like 4
    const c = getRandomInt(3, 12) * b; // multiple of b to ensure clean division
    const multiplier = getRandomInt(20, 60); // like 35 (since 140/4=35)
    const a = b * multiplier; // first term
    const m = c * multiplier; // unknown to solve for
    
    // STEP 2: Verify the calculation
    // 140/980 = 4/28 → 140*28 = 3920, 980*4 = 3920 ✓
    
    return {
      questionText: `The ratio $${a}$ to $m$ is equivalent to the ratio $${b}$ to $${c}$. What is the value of $m$?`,
      figureCode: null,
      options: null,
      correctAnswer: m.toString(),
      explanation: `The correct answer is ${m}. It's given that the ratio $${a}$ to $m$ is equivalent to the ratio $${b}$ to $${c}$. Therefore, the value of $m$ can be found by solving the equation $\\frac{${a}}{m}=\\frac{${b}}{${c}}$. Multiplying each side of this equation by $m$ yields $${a}=\\frac{${b}m}{${c}}$. Multiplying each side of this equation by $${c}$ yields $${a * c}=${b}m$. Dividing each side of this equation by $${b}$ yields $${m}=m$. Therefore, the value of $m$ is ${m}.`
    };
  }
};

/**
 * Question ID: 3310c2ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quarts: 76, conversion: 8 oz/cup, 4 cups/quart]
 * - Difficulty factors: [Multi-step unit conversion, quarts→cups→ounces]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/3310c2ab.ts