import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 95eeeb5b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = ax² + bx + c through (7,0) and (-3,0), a > 1 integer]
 * - Difficulty factors: [Factored form from roots, a+b+c evaluation]
 * - Distractor patterns: [A: -6, B: -3, C: 4, D: 5]
 * - Constraints: [a + b + c = f(1) = a(1-7)(1+3) = -24a, with a=2 gives -48... wait]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_95eeeb5b = {
  metadata: {
    // id: "95eeeb5b",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const r1 = getRandomInt(4, 10);
    const r2 = -getRandomInt(1, 5);
    const a = getRandomInt(2, 4);
    
    const f1 = a * (1 - r1) * (1 - r2);
    
    const optionsData = [
      { text: `$${f1}$`, isCorrect: true },
      { text: `$${f1 + 3}$`, isCorrect: false },
      { text: `$${-f1}$`, isCorrect: false },
      { text: `$${Math.abs(f1)}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The function $f(x)=ax^2+bx+c$ passes through $(${r1},0)$ and $(${r2},0)$. If $a>${getRandomInt(1, 2)}$ is an integer, which could be $a+b+c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: f1.toString(),
      explanation: `Choice ${correctLetter} is correct. $f(x)=a(x-${r1})(x${r2 >= 0 ? `-${r2}` : `+${Math.abs(r2)}`})$. Then $a+b+c=f(1)=a(1-${r1})(1${r2 >= 0 ? `-${r2}` : `+${Math.abs(r2)}`}=${f1}$.`
    };
  }
};

/**
 * Question ID: ef926848
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [square P side x, square Q perimeter 176 more]
 * - Difficulty factors: [Perimeter/area relationships, function modeling]
 * - Distractor patterns: [A: (x+44)², B: (x+176)², C/D: incorrect]
 * - Constraints: [Side of Q is x + 44, area is (x+44)²]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */