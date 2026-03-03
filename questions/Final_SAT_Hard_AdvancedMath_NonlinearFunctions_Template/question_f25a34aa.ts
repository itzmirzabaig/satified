import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: f25a34aa
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area = x², base = 2x+22, height = x-10]
 * - Difficulty factors: [Triangle area, quadratic equation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must solve ½(2x+22)(x-10) = x²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_f25a34aa = {
  metadata: {
    // id: "f25a34aa",
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

/**
 * Question ID: 4d7064a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-10)(x+13), find minimum]
 * - Difficulty factors: [Factored form, vertex x-coordinate]
 * - Distractor patterns: [A: -130 (c), B: -13 (root), C: -23/2, D: -3/2 (correct)]
 * - Constraints: [Minimum at (10 + (-13))/2 = -3/2]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */