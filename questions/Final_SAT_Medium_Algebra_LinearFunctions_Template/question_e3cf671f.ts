import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e3cf671f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4 (single digit), k unknown, f(5)=32, find f(10)]
 * - Difficulty factors: [Two-step: find k, then evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [k must be integer for clean arithmetic]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_e3cf671f = {
  metadata: {
    // id: "e3cf671f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // First coefficient (4 in original) should be single digit (3-6)
    const a = getRandomInt(3, 6);
    // Target f(5) value - double digit (25-45 range)
    const targetVal = getRandomInt(25, 45);
    // Evaluate at x = 10 (or nearby)
    const evalPoint = 10;
    const knownPoint = 5;
    
    // STEP 2: Solve for k using f(5) = targetVal
    // f(x) = ax + k(x-1)
    // f(5) = a*5 + k*4 = targetVal
    // 4k = targetVal - 5a
    // k = (targetVal - 5a) / 4
    // Ensure k is integer
    let k = (targetVal - a * knownPoint) / (knownPoint - 1);
    
    // Adjust targetVal if needed to make k integer
    let adjustedTargetVal = targetVal;
    while (!Number.isInteger(k)) {
      const adjustment = getRandomInt(-2, 2);
      adjustedTargetVal = targetVal + adjustment;
      k = (adjustedTargetVal - a * knownPoint) / (knownPoint - 1);
      if (Number.isInteger(k)) break;
    }
    
    // STEP 3: Calculate f(10)
    // f(x) = ax + k(x-1) = (a+k)x - k
    const fAtEval = (a + k) * evalPoint - k;
    
    // STEP 4: Return question data
    return {
      questionText: `The function $f$ is defined by $f(x)=${a}x+k(x-1)$, where $k$ is a constant, and $f(${knownPoint})=${adjustedTargetVal}$. What is the value of $f(${evalPoint})$?`,
      figureCode: null,
      options: null,
      correctAnswer: fAtEval.toString(),
      explanation: `First find $k$: $f(${knownPoint}) = ${a}(${knownPoint}) + k(${knownPoint}-1) = ${a * knownPoint} + ${knownPoint - 1}k = ${adjustedTargetVal}$. So ${knownPoint - 1}k = ${adjustedTargetVal - a * knownPoint}$, giving $k = ${k}$. Then $f(x) = ${a}x + ${k}(x-1) = ${a + k}x - ${k}$. Thus $f(${evalPoint}) = ${a + k}(${evalPoint}) - ${k} = ${fAtEval}$.`
    };
  }
};

/**
 * Question ID: 94838634
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constant value: 39 (double digit)]
 * - Difficulty factors: [Understanding constant functions]
 * - Distractor patterns: [A = all zeros, C = linear pattern, D = decreasing pattern]
 * - Constraints: [None - conceptual]
 * - Question type: [Text→Multiple Choice with Tables in options]
 * - Figure generation: [Tables in options only]
 */