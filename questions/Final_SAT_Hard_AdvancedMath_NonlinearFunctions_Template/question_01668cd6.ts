import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 01668cd6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 33(0.4)^(x+3), g(x) = 33(0.16)(0.4)^(x-2)]
 * - Difficulty factors: [Exponential equivalent forms, maximum value display]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Analyze which form shows max value as coefficient]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_01668cd6 = {
  metadata: {
    // id: "01668cd6",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const base = (getRandomInt(30, 70) / 100);
    const coeff = getRandomInt(20, 50);
    const exp1 = getRandomInt(2, 5);
    const exp2 = getRandomInt(1, 4);
    
    const optionsData = [
      { text: `I only`, isCorrect: false },
      { text: `II only`, isCorrect: true },
      { text: `I and II`, isCorrect: false },
      { text: `Neither I nor II`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `The functions $f$ and $g$ are defined for $x \\geq 0$. Which displays the maximum value as a constant or coefficient? I. $f(x)=${coeff}(${base.toFixed(2)})^{x+${exp1}}$ II. $g(x)=${coeff}(${(base*base).toFixed(2)})(${base.toFixed(2)})^{x-${exp2}}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `II only`,
      explanation: `Choice ${correctLetter} is correct. For decaying exponentials with $x \\geq 0$, the maximum is at $x=0$. For I, $f(0)=${coeff}(${base.toFixed(2)})^{${exp1}}$, not displayed. For II, $g(0)=${coeff}(${(base*base).toFixed(2)})(${base.toFixed(2)})^{-${exp2}}=${coeff}$, which is displayed.`
    };
  }
};

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