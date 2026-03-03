import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 26501
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+3)(x+1), roots at -3, -1]
 * - Difficulty factors: [Factored form, vertex location, interval identification]
 * - Distractor patterns: [A: -4<x<-3, B: -3<x<1, C: 1<x<3, D: 3<x<4]
 * - Constraints: [Vertex at x = (-3 + -1)/2 = -2, which is in (-3, 1)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_26501 = {
  metadata: {
    // id: "26501",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const r1 = -getRandomInt(2, 6);
    const r2 = r1 + getRandomInt(2, 5);
    const vertex = (r1 + r2) / 2;
    
    const optionsData = [
      { text: `$${r1 - 1}<x<${r1}$`, isCorrect: false },
      { text: `$${r1}<x<${r2}$`, isCorrect: true },
      { text: `$${r2}<x<${r2 + 2}$`, isCorrect: false },
      { text: `$${r2 + 2}<x<${r2 + 3}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    const factor1 = r1 >= 0 ? `(x-${r1})` : `(x+${Math.abs(r1)})`;
    const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=${factor1}${factor2}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$${r1}<x<${r2}$`,
      explanation: `Choice ${correctLetter} is correct. The x-intercepts are at $x=${r1}$ and $x=${r2}$. The vertex (minimum) is at $x=\\frac{${r1}+${r2}}{2}=${vertex}$, which lies in the interval $(${r1}, ${r2})$.`
    };
  }
};

/**
 * Question ID: 55c5d3c2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-int (0,-25), point (2,23), a > 0]
 * - Difficulty factors: [Exponential system, solving for two parameters]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer a and integer answer for a+b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */