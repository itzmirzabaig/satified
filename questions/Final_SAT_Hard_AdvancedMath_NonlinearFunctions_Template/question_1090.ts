import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1090
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots at -20, -4, vertex y-coordinate -64]
 * - Difficulty factors: [Finding vertex x-coordinate from roots]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [r = midpoint of roots = (-20 + -4)/2 = -12]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1090 = {
  metadata: {
    id: "1090",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const r1 = -getRandomInt(15, 30);
    const r2 = -getRandomInt(2, 10);
    const vertexX = (r1 + r2) / 2;
    const vertexY = -getRandomInt(40, 80);
    
    return {
      questionText: `Function $f$ is a quadratic where $f(${r1})=0$ and $f(${r2})=0$. The graph has a vertex at $(r, ${vertexY})$. What is the value of $r$?`,
      figureCode: null,
      options: null,
      correctAnswer: vertexX.toString(),
      explanation: `The x-coordinate of the vertex is the average of the roots: $r=\\frac{${r1}+(${r2})}{2}=\\frac{${r1 + r2}}{2}=${vertexX}$.`
    };
  }
};
