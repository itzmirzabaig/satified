import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: dcf63c94
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 272(2)^x, h(x) = f(x-4)]
 * - Difficulty factors: [Exponential transformation, horizontal shift]
 * - Distractor patterns: [A: 17(2)^x, B: 68(2)^x, C: 272(16)^x, D: 272(8)^x]
 * - Constraints: [h(x) = 272·2^(x-4) = 272/16 · 2^x = 17·2^x]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_dcf63c94 = {
  metadata: {
    // id: "dcf63c94",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const coeff = getRandomInt(100, 400);
    const base = getRandomInt(2, 5);
    const shift = getRandomInt(2, 5);
    
    const newCoeff = Math.round(coeff / Math.pow(base, shift));
    
    const optionsData = [
      { text: `$h(x)=${newCoeff}(${base})^x$`, isCorrect: true },
      { text: `$h(x)=${Math.round(coeff/shift)}(${base})^x$`, isCorrect: false },
      { text: `$h(x)=${coeff}(${Math.pow(base, shift)})^x$`, isCorrect: false },
      { text: `$h(x)=${coeff}(${Math.pow(base, shift-1)})^x$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      questionText: `$f(x)=${coeff}(${base})^x$ and $h(x)=f(x-${shift})$. Which defines $h$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$h(x)=${newCoeff}(${base})^x$`,
      explanation: `Choice ${correctLetter} is correct. $h(x)=f(x-${shift})=${coeff}(${base})^{x-${shift}}=${coeff}(${base})^{-${shift}}(${base})^x=\\frac{${coeff}}{${Math.pow(base, shift)}}(${base})^x=${newCoeff}(${base})^x$.`
    };
  }
};

/**
 * Question ID: 2b1a27cd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max depth 302.4 at 6 min, surface at 12 min]
 * - Difficulty factors: [Quadratic model, depth at specific time]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must use vertex form, evaluate at t=10]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */