import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 8c5dbd3e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [110%, 55%, 50]
 * - Difficulty factors: [Chained percentage calculations]
 * - Distractor patterns: [Same as similar problems]
 * - Constraints: [z = 0.45 * 50, w = 2.1 * z = 47.25]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_8c5dbd3e = {
  metadata: {
    // id: "8c5dbd3e",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random parameters
    const P1 = getRandomInt(90, 140); // w is P1% greater than z
    const P2 = getRandomInt(40, 70);  // z is P2% less than base
    const baseValue = getRandomInt(30, 80);
    
    // STEP 2: Calculate values
    const zValue = Math.round(baseValue * (1 - P2 / 100) * 100) / 100;
    const wMultiplier = 1 + P1 / 100;
    const wValue = Math.round(zValue * wMultiplier * 100) / 100;
    
    return {
      questionText: `The number $w$ is ${P1}% greater than the number $z$. The number $z$ is ${P2}% less than ${baseValue}. What is the value of $w$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: wValue.toString(),
      explanation: `It's given that $z$ is ${P2}% less than ${baseValue}. Therefore, $z = (1 - \\frac{${P2}}{100})(${baseValue}) = ${1 - P2/100} × ${baseValue} = ${zValue}$. It's also given that $w$ is ${P1}% greater than $z$. Therefore, $w = (1 + \\frac{${P1}}{100})z = ${wMultiplier} × ${zValue} = ${wValue}$.`
    };
  }
};

/**
 * Question ID: 54cb53cf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1.27, p%]
 * - Difficulty factors: [Inverse percentage relationship, rounding]
 * - Distractor patterns: [Using 1.27 directly, wrong rounding]
 * - Constraints: [2018 = 1.27 * 2014, so 2014 = 100/127 * 2018 ≈ 78.74%]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */