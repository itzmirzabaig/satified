import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1149
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area = x², base = 2x+22, height = x-10]
 * - Difficulty factors: [Triangle area, quadratic equation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must solve ½(2x+22)(x-10) = x²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1149 = {
  metadata: {
    id: "1149",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = getRandomInt(6, 12);
    const b = 2 * h + getRandomInt(2, 8);
    
    const x = (b * h) / (b - 2 * h);
    
    return {
      questionText: `A triangle has area $x^2$ square cm. The base is $2x+${b}$ cm and height is $x-${h}$ cm. What is $x$?`,
      figureCode: null,
      options: null,
      correctAnswer: x.toString(),
      explanation: `Area $=\\frac{1}{2}(2x+${b})(x-${h})=x^2$. Expanding: $(x+${b/2})(x-${h})=x^2$, so $x^2+(${b/2-h})x-${b*h/2}=x^2$. Thus $(${b/2-h})x=${b*h/2}$, giving $x=${x}$.`
    };
  }
};
