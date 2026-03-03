import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 7a6d06bf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 155, length = 7×width - 4]
 * - Difficulty factors: [Quadratic word problem, rectangle dimensions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must factor to give positive integer width]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_7a6d06bf = {
  metadata: {
    // id: "7a6d06bf",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const w = getRandomInt(4, 10);
    const mult = getRandomInt(5, 9);
    const diff = getRandomInt(2, 6);
    const area = w * (mult * w - diff);
    
    return {
      questionText: `A rectangle has area ${area} square inches. The length is ${diff} inches less than ${mult} times the width. What is the width?`,
      figureCode: null,
      options: null,
      correctAnswer: w.toString(),
      explanation: `Let width be $w$. Then $w(${mult}w-${diff})=${area}$, so ${mult}w^2-${diff}w-${area}=0$. Solving gives $w=${w}$ (positive solution).`
    };
  }
};

/**
 * Question ID: 04bbce67
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+7)² + 4]
 * - Difficulty factors: [Vertex form, minimum value location]
 * - Distractor patterns: [A: -4 (correct), B: -2, C: 2, D: 4]
 * - Constraints: [Minimum at x = -h where vertex is (h, k)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */