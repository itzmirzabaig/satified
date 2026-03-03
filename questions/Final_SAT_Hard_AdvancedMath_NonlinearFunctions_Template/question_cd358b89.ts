import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: cd358b89
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x+6)(x+5)(x+1), g(x) = f(x-1)]
 * - Difficulty factors: [Function transformation, cubic, finding roots of g]
 * - Distractor patterns: [A: -15, B: -9, C: 11, D: 15]
 * - Constraints: [g(x) = (x+5)(x+4)(x), sum of roots = -9]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_cd358b89 = {
  metadata: {
    // id: "cd358b89",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(3, 8);
    const b = getRandomInt(1, 4);
    const c = -getRandomInt(1, 4);
    
    const g_roots = [1 + a, 1 + b, 1 + c];
    const sum = g_roots.reduce((x, y) => x + y, 0);
    
    const optionsData = [
      { text: `$${-(a+b+c+3)}$`, isCorrect: false },
      { text: `$${sum}$`, isCorrect: true },
      { text: `$${Math.abs(sum)}$`, isCorrect: false },
      { text: `$${a+b+c}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    const factor1 = `(x-${a})`;
    const factor2 = `(x-${b})`;
    const factor3 = c >= 0 ? `(x-${c})` : `(x+${Math.abs(c)})`;
    
    return {
      questionText: `$f(x)=${factor1}${factor2}${factor3}$ and $g(x)=f(x-1)$. If $g$ has x-intercepts at $(p,0),(q,0),(r,0)$, what is $p+q+r$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: sum.toString(),
      explanation: `Choice ${correctLetter} is correct. $g(x)=(x-${1+a})(x-${1+b})(x-${1+c})$. The roots are ${g_roots.join(', ')}, summing to ${sum}.`
    };
  }
};

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