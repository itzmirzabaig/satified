import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 08d03fe4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(1) = k, find form showing k]
 * - Difficulty factors: [Exponential evaluation, form recognition]
 * - Distractor patterns: [Various forms, need f(1) visible as coefficient]
 * - Constraints: [If f(x) = 128(2)^(x-1), then f(1) = 128]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_08d03fe4 = {
  metadata: {
    // id: "08d03fe4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const coeff = getRandomInt(50, 200);
    const base = getRandomInt(2, 5);
    
    const optionsData = [
      { text: `$f(x)=${Math.round(coeff/2)}(${base})^{x+1}$`, isCorrect: false },
      { text: `$f(x)=${Math.round(coeff/1.5)}(${base})^x$`, isCorrect: false },
      { text: `$f(x)=${coeff}(${base})^{x-1}$`, isCorrect: true },
      { text: `$f(x)=${Math.round(coeff*1.5)}(${base})^{x-2}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `For function $f$, $f(1)=k$. Which form shows $k$ as a coefficient or base?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$f(x)=${coeff}(${base})^{x-1}$`,
      explanation: `Choice ${correctLetter} is correct. For $f(x)=${coeff}(${base})^{x-1}$, we have $f(1)=${coeff}(${base})^{0}=${coeff}$. The value $k=${coeff}$ appears as the coefficient.`
    };
  }
};

/**
 * Question ID: 7eed640d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = -16x² + 100x + 10]
 * - Difficulty factors: [Quadratic context, x-intercept interpretation]
 * - Distractor patterns: [A: initial height, B: max height, C: time at max, D: time when hits ground]
 * - Constraints: [Positive x-intercept is when projectile hits ground]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */