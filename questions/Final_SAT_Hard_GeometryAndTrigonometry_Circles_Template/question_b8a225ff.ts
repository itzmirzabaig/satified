import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: b8a225ff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-5, 5), radius: 2, scale factor: 2]
 * - Difficulty factors: [Circle equation manipulation, radius scaling]
 * - Distractor patterns: [Scaling area instead of radius, wrong center]
 * - Constraints: [Scale factor applied to radius]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_b8a225ff = {
  metadata: {
    // id: "b8a225ff",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center
    const h = -getRandomInt(3, 8);
    const k = getRandomInt(3, 8);
    
    // STEP 2: Generate radius for circle A
    const rA = getRandomInt(2, 6);
    
    // STEP 3: Generate scale factor
    const scale = getRandomInt(2, 4);
    
    // STEP 4: Calculate circle B radius and equation constant
    const rB = rA * scale;
    const kVal = rB * rB;
    
    return {
      questionText: `Circle A in the xy-plane has the equation $\\\\( (x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=${rA*rA} \\\\)$. Circle B has the same center as circle A. The radius of circle B is ${scale} times the radius of circle A. The equation defining circle B in the xy-plane is $\\\\( (x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=k \\\\)$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: null,
      options: null,
      correctAnswer: kVal.toString(),
      explanation: `Circle A has center $(${h}, ${k})$ and radius $${rA}$. Circle B has the same center and radius $${scale} \\\\times ${rA} = ${rB}$. The equation of circle B is $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=${rB}^{2}=${kVal}$. Therefore, $k = ${kVal}$.`
    };
  }
};

/**
 * Question ID: b0a72bdc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (5, 3), radius squared: 16]
 * - Difficulty factors: [Standard form recognition, diameter vs radius]
 * - Distractor patterns: [Confusing r with r², using radius instead of diameter]
 * - Constraints: [Standard circle equation]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */