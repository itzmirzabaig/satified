import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 6e7ae9fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(x) = x(x-2)(x+6)², solve g(7-w) = 0]
 * - Difficulty factors: [Cubic/quartic roots, substitution, sum of solutions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Roots at x=0, 2, -6 (double), so 7-w ∈ {0, 2, -6}]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_6e7ae9fc = {
  metadata: {
    // id: "6e7ae9fc",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const r1 = getRandomInt(1, 5);
    const r2 = getRandomInt(5, 10);
    const r3 = -getRandomInt(4, 8);
    const shift = getRandomInt(5, 12);
    
    const w1 = shift - r1;
    const w2 = shift - r2;
    const w3 = shift - r3;
    const sum = w1 + w2 + w3;
    
    const factor1 = `(x-${r1})`;
    const factor2 = `(x-${r2})`;
    const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;
    
    return {
      questionText: `$g(x)=x${factor2}${factor3}^2$. If $g(${shift}-w)=0$, what is the sum of all possible $w$?`,
      figureCode: null,
      options: null,
      correctAnswer: sum.toString(),
      explanation: `$g(${shift}-w)=(${shift}-w)(${shift}-w-${r2})(${shift}-w${r3 >= 0 ? `-${r3}` : `+${Math.abs(r3)}`})^2=0$. So ${shift}-w\\in\\{0,${r2},${r3}\\}$, giving $w\\in\\{${w1},${w2},${w3}\\}$. Sum is ${sum}$.`
    };
  }
};

/**
 * Question ID: 48f83c34
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 9, length: x, width: x-7]
 * - Difficulty factors: [Volume formula, dimension relationships]
 * - Distractor patterns: [A: x(x+9)(x+7), B: x(x+9)(x-7), C: x(x+11)(x-1), D: 9x(x-7)]
 * - Constraints: [V = 9 × x × (x-7)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */