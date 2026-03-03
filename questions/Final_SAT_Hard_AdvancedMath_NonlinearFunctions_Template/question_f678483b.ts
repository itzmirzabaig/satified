import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: f678483b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [depth function with roots at -19 and 35]
 * - Difficulty factors: [Quadratic application, finding when depth = 0]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Positive solution for when device surfaces]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_f678483b = {
  metadata: {
    // id: "f678483b",
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
      explanation: `The surface is at depth $g(x)=0$. Setting $-\\frac{1}{${k}}(x+${a})(x-${b})=0$ gives $x=-${a}$ or $x=${b}$. Since $x>0$, the answer is ${b}$ minutes.`
    };
  }
};

/**
 * Question ID: 6d9e01a2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 4x² - 50x + 126]
 * - Difficulty factors: [Completing the square, vertex x-coordinate]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Answer is 25/4 or 6.25]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */