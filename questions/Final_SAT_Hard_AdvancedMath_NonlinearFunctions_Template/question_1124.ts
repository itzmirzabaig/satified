import { getRandomInt } from '../../utils/math';
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
    
    const length = mult * w - diff;

    return {
      questionText: `A rectangle has an area of ${area} square inches. The length, in inches, is ${diff} less than ${mult} times the width. What is the width, in inches?`,
      figureCode: null,
      options: [],
      correctAnswer: w.toString(),
      explanation: `Let the width be $w$ inches. The length is $${mult}w-${diff}$, so the area equation is $w(${mult}w-${diff})=${area}$, which expands to $${mult}w^2-${diff}w-${area}=0$. Factoring the positive root gives $w=${w}$ (the width), and then the length is $${mult}(${w})-${diff}=${length}$ inches. The width is $${w}$ inches.`
    };
  }
};
