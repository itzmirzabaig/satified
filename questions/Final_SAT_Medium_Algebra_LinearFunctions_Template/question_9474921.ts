import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9474921
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [j(x) = mx + 144, j(12) = 18, find j(10) = 39]
 * - Difficulty factors: [Two-step: find m, evaluate at new point]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [m must be negative for this pattern]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */

export const generator_9474921 = {
  metadata: {
    // id: "9474921",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Intercept: 100-200
    const b = getRandomInt(100, 200);
    // Point 1: x1 = 10-15
    const x1 = getRandomInt(10, 15);
    // j(x1) should be small positive
    const j1 = getRandomInt(10, 30);
    // Calculate m (should be negative)
    // j1 = m*x1 + b → m = (j1 - b)/x1
    let m = (j1 - b) / x1;
    // Ensure m is integer
    let adjustedJ1 = j1;
    while (!Number.isInteger(m)) {
      const adjustment = getRandomInt(-2, 2);
      adjustedJ1 = j1 + adjustment;
      m = (adjustedJ1 - b) / x1;
      if (Number.isInteger(m)) break;
    }
    
    // Target x
    const x2 = x1 - getRandomInt(1, 3);
    const j2 = m * x2 + b;
    
    // STEP 2: Return question data
    return {
      questionText: `$j(x) = mx + ${b}$ For the linear function $j$, $m$ is a constant and $j(${x1}) = ${adjustedJ1}$. What is the value of $j(${x2})$?`,
      figureCode: null,
      options: null,
      correctAnswer: j2.toString(),
      explanation: `First find $m$: $j(${x1}) = m(${x1}) + ${b} = ${adjustedJ1}$, so $m(${x1}) = ${adjustedJ1 - b}$, giving $m = ${m}$. Then $j(${x2}) = ${m}(${x2}) + ${b} = ${m * x2} + ${b} = ${j2}$.`
    };
  }
};

/**
 * Question ID: 4b0c156b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(28)=15, h(26)=22, slope=-7/2, intercept=113]
 * - Difficulty factors: [Finding equation from two points with negative slope]
 * - Distractor patterns: [A = wrong slope fraction, B = wrong slope and wrong intercept, C = correct slope wrong intercept]
 * - Constraints: [Points must give clean fractional slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */