import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e103300e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4 (single-digit), intercept: 19 (double-digit)]
 * - Difficulty factors: [Interpreting x-intercept of linear function]
 * - Distractor patterns: [B: y-intercept interpretation, C: wrong slope description, D: slope interpretation]
 * - Constraints: [f(x) = 4x + 19, x-intercept is where f(x) = 0]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e103300e = {
  metadata: {
    // id: "e103300e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const slope = getRandomInt(2, 6); // 2-6 range
    const intercept = getRandomInt(10, 25); // 10-25 range
    const xInterceptNum = -intercept;
    const xInterceptDen = slope;
    
    // Simplify
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }
    const divisor = gcd(Math.abs(xInterceptNum), Math.abs(xInterceptDen));
    const simplifiedNum = xInterceptNum / divisor;
    const simplifiedDen = xInterceptDen / divisor;
    
    const xInterceptStr = simplifiedDen === 1 ? simplifiedNum.toString() : `\\\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    
    // STEP 2: Create options
    const correctText = `When $f(x) = 0$, the number is $${xInterceptStr}$.`;
    
    const optionsData = [
      { text: `When $f(x) = 0$, the number is $${xInterceptStr}$.`, isCorrect: true },
      { text: `When the number is $0$, $f(x) = ${intercept}$.`, isCorrect: false, reason: "describes the y-intercept, not the x-intercept" },
      { text: `The value of $f(x)$ increases by $1$ for each increase of ${slope} in the value of the number.`, isCorrect: false, reason: `describes a slope of $\\\\frac{1}{${slope}}$, which is incorrect` },
      { text: `For each increase of $1$ in the value of the number, $f(x)$ increases by ${slope}.`, isCorrect: false, reason: "correctly describes the slope but does not interpret the x-intercept as asked" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The function $f(x)$ is defined as ${intercept} more than ${slope} times a number $x$. If $y = f(x)$ is graphed in the $xy$-plane, what is the best interpretation of the $x$-intercept?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The function is $f(x) = ${slope}x + ${intercept}$. The x-intercept occurs when $f(x) = 0$: $0 = ${slope}x + ${intercept}$, so ${slope}x = -${intercept}$, giving $x = ${xInterceptStr}$. This means when the output is 0, the input number is $${xInterceptStr}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: daad7c32
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [unstretched length: 30 (double-digit), rate: 2 (single-digit)]
 * - Difficulty factors: [Interpreting slope in real-world context]
 * - Distractor patterns: [A: intercept interpretation, B: wrong variable, C: inverse relationship]
 * - Constraints: [l = 30 + 2w, interpret 2 as stretch per unit weight]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-functions/daad7c32.ts