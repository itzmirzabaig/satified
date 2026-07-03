import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1118
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 104, length = width + 5]
 * - Difficulty factors: [Quadratic word problem, rectangle dimensions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield positive integer solution]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_1118 = {
  metadata: {
    id: "1118",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // width × (width + diff) = area
    const w = getRandomInt(6, 15);
    const diff = getRandomInt(3, 8);
    const area = w * (w + diff);
    const length = w + diff;
    
    return {
      questionText: `A landscaper is designing a rectangular garden. The length is to be ${diff} feet longer than the width. If the area will be ${area} square feet, what will be the length, in feet?`,
      figureCode: null,
      options: [],
      correctAnswer: length.toString(),
      explanation: `Let the width be $w$ feet. Then the length is $w+${diff}$, and the area equation is $w(w+${diff})=${area}$, so $w^2+${diff}w-${area}=0$. Factoring gives $(w-${w})(w+${w + diff})=0$, so the positive solution is $w=${w}$. The length is therefore $w+${diff}=${length}$ feet.`
    };
  }
};
