import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e5c57163
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side length multiplier: 166 (triple-digit)]
 * - Difficulty factors: [Square area scaling, algebraic manipulation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must use perfect square relationship: area ratio = (linear ratio)²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_e5c57163 = {
  metadata: {
    // id: "e5c57163",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - preserve triple-digit magnitude
    // Original used 166, so we use 100-199 range for similar difficulty
    const multiplier = getRandomInt(100, 199);
    
    // STEP 2: Calculate answer
    // If side ratio is k, area ratio is k²
    const k = multiplier * multiplier;
    
    // STEP 3: Return question data
    return {
      questionText: `Square A has side lengths that are ${multiplier} times the side lengths of square B. The area of square A is $k$ times the area of square B. What is the value of $k$?`,
      figureCode: null,
      options: null,
      correctAnswer: k.toString(),
      explanation: `The area of a square is $s^2$, where $s$ is the side length. If square B has side length $s$, then square A has side length ${multiplier}s. The area of square B is $s^2$, and the area of square A is $(${multiplier}s)^2 = ${multiplier}^2 s^2 = ${k}s^2$. Therefore, $k = ${k}$.`
    };
  }
};

/**
 * Question ID: 9966235e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge length: 68, radius: 34 (double-digit)]
 * - Difficulty factors: [Volume formulas, cube-sphere relationship, subtraction]
 * - Distractor patterns: [A: correct, B: sphere volume only, C: calculation error, D: cube volume only]
 * - Constraints: [Sphere touches center of each face means diameter = edge length]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None - conceptual 3D geometry]
 */