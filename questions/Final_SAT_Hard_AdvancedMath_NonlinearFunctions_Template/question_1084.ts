import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1084
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+7)² + 4]
 * - Difficulty factors: [Vertex form, minimum value location]
 * - Distractor patterns: [A: -4 (correct), B: -2, C: 2, D: 4]
 * - Constraints: [Minimum at x = -h where vertex is (h, k)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1084 = {
  metadata: {
    id: "1084",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = -getRandomInt(3, 10);
    const k = getRandomInt(2, 8);
    
    return {
      questionText: `$f(x)=(x${h >= 0 ? `-${h}` : `+${Math.abs(h)}`})^2+${k}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: null,
      correctAnswer: h.toString(),
      explanation: `In vertex form $f(x)=(x-h)^2+k$, the minimum occurs at $x=h$. Here $h=${h}$, so the minimum is at $x=${h}$.`
    };
  }
};
