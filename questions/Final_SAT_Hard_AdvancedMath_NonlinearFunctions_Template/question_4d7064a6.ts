import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



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

export const generator_4d7064a6 = {
  metadata: {
    // id: "4d7064a6",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const r1 = getRandomInt(8, 15);
    const r2 = -getRandomInt(10, 20);
    const vertex = (r1 + r2) / 2;
    
    const c = r1 * r2;
    
    const optionsData = [
      { text: `$${c}$`, isCorrect: false },
      { text: `$${r2}$`, isCorrect: false },
      { text: `$\\frac{${r1 + r2 - 20}}{2}$`, isCorrect: false },
      { text: `$\\frac{${Math.round(2*vertex)}}{2}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    const factor1 = `(x-${r1})`;
    const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
    
    return {
      questionText: `$f(x)=${factor1}${factor2}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: vertex.toString(),
      explanation: `Choice ${correctLetter} is correct. The x-intercepts are at $x=${r1}$ and $x=${r2}$. The minimum is at the midpoint: $x=\\frac{${r1}+(${r2})}{2}=\\frac{${Math.round(2*vertex)}}{2}=${vertex}$.`
    };
  }
};

/**
 * Question ID: 1853bb35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [45% decrease]
 * - Difficulty factors: [Percent decrease to decay factor]
 * - Distractor patterns: [A: 0.55(14)^x, B: 1.45(14)^x, C: 14(0.55)^x, D: 14(1.45)^x]
 * - Constraints: [Decay factor = 1 - 0.45 = 0.55]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */