import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f81a0503
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,-5), (1,-1), slope: 4, intercept: -5]
 * - Difficulty factors: [Finding equation from two points]
 * - Distractor patterns: [A: wrong signs, B: wrong slope, C: wrong values, D: correct]
 * - Constraints: [Clean integer slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_f81a0503 = {
  metadata: {
    // id: "f81a0503",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const x1 = 0;
    const y1 = getRandomInt(-8, -2);
    const x2 = getRandomInt(1, 3);
    const slope = getRandomInt(2, 6);
    const y2 = y1 + slope * (x2 - x1);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$y = ${-slope}x + \\frac{1}{${Math.abs(y1)}}$`, isCorrect: false },
      { text: `$y = \\frac{1}{${slope}}x ${y1 < 0 ? '-' : '+'} ${Math.abs(y1)}$`, isCorrect: false },
      { text: `$y = ${-slope}x + ${Math.abs(y1) + 1}$`, isCorrect: false },
      { text: `$y = ${slope}x ${y1 < 0 ? '-' : '+'} ${Math.abs(y1)}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `In the $xy$-plane, line $k$ passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$. Which equation defines line $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - (${y1})}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${slope}$. The y-intercept is ${y1} (from point $(0, ${y1})$). Therefore, the equation is $y = ${slope}x ${y1 < 0 ? '-' : '+'} ${Math.abs(y1)}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-c39dbbdf.ts
/**
 * Question ID: c39dbbdf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -9, 3]
 * - Difficulty factors: [Finding slope in standard form, parallel lines concept]
 * - Distractor patterns: [A: reciprocal, B: correct, C: sign error, D: wrong coefficient]
 * - Constraints: [Clean fraction slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
