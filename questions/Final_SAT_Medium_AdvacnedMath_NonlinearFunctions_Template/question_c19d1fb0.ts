import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: c19d1fb0
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic projectile motion - initial height
 * - Number ranges: Coefficient 4.9, linear 9, constant 18
 * - Difficulty: Medium - finding initial height from standard form
 */

export const generator_c19d1fb0 = {
  metadata: {
    // id: "c19d1fb0",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const gravityCoeff = 4.9;
    const velocityCoeff = getRandomInt(5, 15);
    const initialHeight = getRandomInt(10, 25);
    
    const questionText = `An egg is thrown from a rooftop. The equation $h=-${gravityCoeff} t^{2}+${velocityCoeff} t+${initialHeight}$ represents this situation, where $h$ is the height of the egg above the ground, in meters, $t$ seconds after it is thrown. According to the equation, what is the height, in meters, from which the egg was thrown?`;
    
    const correctAnswer = initialHeight.toString();
    
    const explanation = `The height from which the egg was thrown is the initial height when $t=0$. Substituting $t=0$: $h = -${gravityCoeff}(0)^{2} + ${velocityCoeff}(0) + ${initialHeight} = ${initialHeight}$ meters.`;
    
    return {
      questionText,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: 0aaef7aa
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Cubic function solve for input
 * - Number ranges: Coefficient 7, p(n)=56, find n
 * - Difficulty: Medium - solving cubic equation
 */