import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 265f2a53
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: -4, y-intercept: 86/3, slope: -3/2]
 * - Difficulty factors: [Calculating slope from intercepts with fraction]
 * - Distractor patterns: [A: small fraction, B: reciprocal, C: correct, D: multiplication error]
 * - Constraints: [Clean fraction result]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_265f2a53 = {
  metadata: {
    // id: "265f2a53",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters for clean fraction slope
    const xInt = getRandomInt(-8, -2);
    const slopeNum = getRandomInt(5, 15);
    const slopeDen = getRandomInt(2, 6);
    const yIntNum = -xInt * slopeNum;
    const yIntDen = slopeDen;
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(yIntNum), yIntDen);
    const finalNum = yIntNum / divisor;
    const finalDen = yIntDen / divisor;
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$\\frac{${slopeDen}}{${Math.abs(finalNum) * 2}}$`, isCorrect: false },
      { text: `$\\frac{${slopeDen}}{${slopeNum}}$`, isCorrect: false },
      { text: `$\\frac{${slopeNum}}{${slopeDen}}$`, isCorrect: true },
      { text: `$\\frac{${Math.abs(finalNum * 2)}}{${finalDen}}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `When line $n$ is graphed in the $xy$-plane, it has an $x$-intercept of $(${xInt}, 0)$ and a $y$-intercept of $\\left(0, \\frac{${finalNum}}{${finalDen}}\\right)$. What is the slope of line $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The slope formula is $m = \\frac{y_2 - y_1}{x_2 - x_1}$. Using the intercepts $(0, \\frac{${finalNum}}{${finalDen}})$ and $(${xInt}, 0)$: $m = \\frac{\\frac{${finalNum}}{${finalDen}} - 0}{0 - (${xInt})} = \\frac{${finalNum}/${finalDen}}{${-xInt}} = \\frac{${slopeNum}}{${slopeDen}}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-f81a0503.ts
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
