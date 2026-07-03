import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1151
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [depth function with roots at -19 and 35]
 * - Difficulty factors: [Quadratic application, finding when depth = 0]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Positive solution for when device surfaces]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_1151 = {
  metadata: {
    id: "1151",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(10, 30);
    const b = getRandomInt(20, 50);
    const k = getRandomInt(40, 80);
    
    return {
      questionText: `The depth of a submersible $x$ minutes after collecting a sample is $g(x)=-\\frac{1}{${k}}(x+${a})(x-${b})$, where $x>0$. How many minutes after collecting the sample did it reach the surface?`,
      figureCode: null,
      options: null,
      correctAnswer: b.toString(),
      explanation: `The device is at the surface when its depth is $g(x)=0$. Setting $-\\frac{1}{${k}}(x+${a})(x-${b})=0$ makes the product zero, which gives $x=-${a}$ or $x=${b}$. Since the time must satisfy $x>0$, the device reaches the surface after ${b} minutes.`
    };
  }
};
