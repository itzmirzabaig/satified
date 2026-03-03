import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b1e1c2f5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [BC=162, ratio CE=2AE (specific values), answer: 54]
 * - Difficulty factors: [Similar triangles, parallel lines, ratio reasoning]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [DE || BC creates similar triangles ADE and ABC]
 * - Question type: [Text→Fill in the blank]
 */

export const generator_b1e1c2f5 = {
  metadata: {
    // id: "b1e1c2f5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values
    const ratio = getRandomInt(2, 4);
    const BC = getRandomInt(120, 200);
    const DE = BC / (1 + ratio);
    
    // Ensure integer answer by adjusting if needed
    let finalBC = BC;
    let finalDE = DE;
    
    if (!Number.isInteger(DE)) {
      finalDE = Math.round(DE);
      finalBC = finalDE * (1 + ratio);
    }
    
    return {
      questionText: `In right triangle $ABC$, angle $C$ is the right angle and $BC = ${finalBC}$. Point $D$ on side $AB$ is connected by a line segment with point $E$ on side $AC$ such that line segment $DE$ is parallel to side $BC$ and $CE = ${ratio}AE$. What is the length of line segment $DE$?`,
      figureCode: null,
      options: null,
      correctAnswer: Math.round(finalDE).toString(),
      explanation: `It's given that $DE$ is parallel to $BC$. By AA similarity, $\\\\triangle ADE \\\\sim \\\\triangle ABC$. Since $CE = ${ratio}AE$ and $AC = AE + CE$, we have $AC = AE + ${ratio}AE = ${1 + ratio}AE$. Therefore $\\\\frac{AE}{AC} = \\\\frac{1}{${1 + ratio}}$. By similarity, $\\\\frac{DE}{BC} = \\\\frac{AE}{AC} = \\\\frac{1}{${1 + ratio}}$. Substituting $BC = ${finalBC}$: $\\\\frac{DE}{${finalBC}} = \\\\frac{1}{${1 + ratio}}$, so $DE = ${Math.round(finalDE)}$.`
    };
  }
};

/**
 * Question ID: 740bf79f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [MP=3, NP=4 from 3-4-5 triangle, answer: 2.4]
 * - Difficulty factors: [Similar right triangles, geometric mean, altitude to hypotenuse]
 * - Distractor patterns: [A: 2.2, B: 2.3, D: 2.5 (close values)]
 * - Constraints: [Right triangle with altitude to hypotenuse creates similar triangles]
 * - Question type: [Figure→Multiple Choice]
 */

// File: generators/lines-angles-and-triangles/740bf79f.ts