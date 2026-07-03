import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1334
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [BC=162, ratio CE=2AE (specific values), answer: 54]
 * - Difficulty factors: [Similar triangles, parallel lines, ratio reasoning]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [DE || BC creates similar triangles ADE and ABC]
 * - Question type: [Text→Fill in the blank]
 */

export const generator_1334 = {
  metadata: {
    id: "1334",
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
      options: [],
      correctAnswer: Math.round(finalDE).toString(),
      explanation: `It's given that $DE$ is parallel to $BC$. By AA similarity, $\\\\triangle ADE \\\\sim \\\\triangle ABC$. Since $CE = ${ratio}AE$ and $AC = AE + CE$, we have $AC = AE + ${ratio}AE = ${1 + ratio}AE$. Therefore $\\\\frac{AE}{AC} = \\\\frac{1}{${1 + ratio}}$. By similarity, $\\\\frac{DE}{BC} = \\\\frac{AE}{AC} = \\\\frac{1}{${1 + ratio}}$. Substituting $BC = ${finalBC}$: $\\\\frac{DE}{${finalBC}} = \\\\frac{1}{${1 + ratio}}$, so $DE = ${Math.round(finalDE)}$.`
    };
  }
};
