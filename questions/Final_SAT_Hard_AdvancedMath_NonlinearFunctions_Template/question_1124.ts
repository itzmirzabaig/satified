import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1124
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 155, length = 7×width - 4]
 * - Difficulty factors: [Quadratic word problem, rectangle dimensions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must factor to give positive integer width]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_1124 = {
  metadata: {
    id: "1124",
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
