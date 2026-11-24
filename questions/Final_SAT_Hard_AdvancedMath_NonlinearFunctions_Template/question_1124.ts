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
      // Before: no "The correct answer is" opening, and "factoring the positive root"
      // skipped the actual factoring. Now the factored form and the rejected root are shown.
      explanation: `The correct answer is ${w}. Let the width be $w$ inches. The length is $${mult}w-${diff}$ inches, so the area equation is $w(${mult}w-${diff})=${area}$, which expands to $${mult}w^2-${diff}w-${area}=0$. This factors as $(${mult}w+${length})(w-${w})=0$. The factor $${mult}w+${length}$ equals $0$ only for a negative value of $w$, which is not possible for a width, so $w=${w}$. As a check, the length is $${mult}(${w})-${diff}=${length}$ inches, and $${w}\\cdot${length}=${area}$ square inches.`
    };
  }
};
