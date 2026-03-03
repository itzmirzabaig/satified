import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fc3d783a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line: 2y=4.5, parabola: y=-4x²+bx, b is positive]
 * - Difficulty factors: [Horizontal line intersects parabola at exactly one point, discriminant = 0]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Horizontal line gives constant y, discriminant must be 0 for single intersection, b > 0]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_fc3d783a = {
  metadata: {
    // id: "fc3d783a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 2y = 4.5, y = -4x² + bx
    // Pattern: lineCoeff*y = lineConstant, parabola y = -a*x² + bx
    
    const lineCoeff = getRandomInt(2, 5);
    const lineConstant = getRandomInt(3, 9);
    const parabolaA = getRandomInt(2, 6); // Coefficient of x² (will be negated)
    
    // y = lineConstant/lineCoeff
    const yValue = lineConstant / lineCoeff;
    
    // For exactly one intersection: line y = k intersects parabola y = -ax² + bx
    // Substituting: k = -ax² + bx → ax² - bx + k = 0
    // Discriminant: b² - 4ak = 0 → b² = 4ak → b = √(4ak) = 2√(ak)
    
    // We need 4*a*k to be a perfect square for b to be integer
    // k = lineConstant/lineCoeff, so we need 4*a*lineConstant/lineCoeff to be perfect square
    
    // Let's work backwards: choose b first, then ensure consistency
    const b = getRandomInt(4, 12) * 2; // Even number for clean math
    
    // From b² = 4*a*yValue = 4*a*lineConstant/lineCoeff
    // We need: b² * lineCoeff = 4*a*lineConstant
    
    // Actually let's be more careful. Choose parameters so discriminant = 0 works out nicely.
    
    // Alternative: Choose a and b, then determine what lineConstant/lineCoeff should be
    // b² = 4*a*k → k = b²/(4a)
    
    const chosenB = getRandomInt(4, 12);
    const chosenA = getRandomInt(1, 4);
    
    // k = b²/(4a) must equal lineConstant/lineCoeff
    const kValue = (chosenB * chosenB) / (4 * chosenA);
    
    // Verify kValue * 4a = b² is perfect square condition
    // And we need to express kValue as lineConstant/lineCoeff with reasonable integers
    
    // Let's use lineCoeff = 2 (or 4) and lineConstant = 2*kValue (or 4*kValue)
    const finalLineCoeff = 2;
    const finalLineConstant = 2 * kValue;
    
    // STEP 2: Calculate derived values
    const bValue = chosenB;
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    return {
      questionText: `In the $xy$-plane, a line with equation $${finalLineCoeff}y=${finalLineConstant}$ intersects a parabola at exactly one point. If the parabola has equation $y=-${chosenA}x^2+bx$, where $b$ is a positive constant, what is the value of $b$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: bValue.toString(),
      explanation: `The correct answer is $${bValue}$. From the line equation, $y = ${kValue}$. Substituting into the parabola: $${kValue} = -${chosenA}x^2 + bx$, which gives $${chosenA}x^2 - ${bValue}x + ${kValue} = 0$. For exactly one solution, the discriminant equals 0: $(-${bValue})^2 - 4(${chosenA})(${kValue}) = ${bValue*bValue} - ${4*chosenA*kValue} = 0$. Thus $b = ${bValue}$.`
    };
  }
};

/**
 * Question ID: 4661e2a9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [simple linear and quadratic system, intersection points]
 * - Difficulty factors: [System with parabola and line, solving by substitution, involves radicals]
 * - Distractor patterns: [Other radical combinations, sign errors]
 * - Constraints: [Must generate valid Mafs figure showing intersection]
 * - Question type: [Multiple choice text with figure]
 * - Figure generation: [Mafs graph showing line and parabola intersections]
 */

// File: generators/hard/advanced_math/4661e2a9.ts