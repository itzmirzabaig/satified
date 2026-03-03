import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a1fd2304
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [25% solution, 10% solution, 3 liters, target 15%]
 * - Difficulty factors: [Mixture problem with percentages]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [0.25x + 0.10(3) = 0.15(x+3)]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_a1fd2304 = {
  metadata: {
    // id: "a1fd2304",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const strongPct = getRandomInt(20, 40);
    const weakPct = getRandomInt(5, 15);
    const weakLiters = getRandomInt(2, 5);
    const targetPct = getRandomInt(weakPct + 2, strongPct - 5);
    
    // strongPct% * x + weakPct% * weakLiters = targetPct% * (x + weakLiters)
    // (strongPct/100)x + (weakPct/100)*weakLiters = (targetPct/100)(x + weakLiters)
    // strongPct*x + weakPct*weakLiters = targetPct*x + targetPct*weakLiters
    // x(strongPct - targetPct) = targetPct*weakLiters - weakPct*weakLiters
    // x = weakLiters * (targetPct - weakPct) / (strongPct - targetPct)
    
    const x = (weakLiters * (targetPct - weakPct)) / (strongPct - targetPct);
    
    // Ensure nice number
    const result = Number.isInteger(x) ? x : Math.round(x * 10) / 10;
    
    return {
      questionText: `How many liters of a ${strongPct}% saline solution must be added to ${weakLiters} liters of a ${weakPct}% saline solution to obtain a ${targetPct}% saline solution?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Let $x$ be liters of ${strongPct}% solution. Total salt: $0.${strongPct}x + 0.${weakPct}(${weakLiters}) = 0.${targetPct}(x + ${weakLiters})$. Solving: ${strongPct}x + ${weakPct * weakLiters} = ${targetPct}x + ${targetPct * weakLiters}, so $${strongPct - targetPct}x = ${targetPct * weakLiters - weakPct * weakLiters}$, giving $x = ${result}$.`
    };
  }
};

/**
 * Question ID: 5b7599a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -3, y-intercept: 6, R is positive constant]
 * - Difficulty factors: [Matching graph to equation with parameter R]
 * - Distractor patterns: [A: Rx+18y=36, B: Rx-18y=-36, C: 18x+Ry=36, D: 18x-Ry=-36]
 * - Constraints: [Equation 18x + 6y = 36 matches slope -3, intercept 6 when R=6]
 * - Question type: [Figure → Multiple Choice Text]
 * - Figure generation: [Line with y-intercept and x-intercept]
 */