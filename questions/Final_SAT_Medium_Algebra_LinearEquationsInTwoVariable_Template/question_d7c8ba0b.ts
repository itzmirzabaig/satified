import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d7c8ba0b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,9) and (1,17), slope: 8, intercept: 9]
 * - Difficulty factors: [Calculating slope from two points, identifying y-intercept]
 * - Distractor patterns: [A: reciprocal slope, B: mixed up values, C: wrong slope, D: correct]
 * - Constraints: [Clean integer slope and intercept]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_d7c8ba0b = {
  metadata: {
    // id: "d7c8ba0b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate points that give clean integer slope
    const x1 = 0;
    const y1 = getRandomInt(3, 15);
    const x2 = getRandomInt(1, 5);
    const slope = getRandomInt(2, 10);
    const y2 = y1 + slope * (x2 - x1);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$y = \\frac{${x2}}{${slope}}x + ${y1}$`, isCorrect: false, reason: "incorrect slope (reciprocal)" },
      { text: `$y = ${x2}x + \\frac{${y1}}{${slope}}$`, isCorrect: false, reason: "mixed up values" },
      { text: `$y = ${slope - getRandomInt(1, 3)}x + ${y1 - 1}$`, isCorrect: false, reason: "close but incorrect slope and intercept" },
      { text: `$y = ${slope}x + ${y1}$`, isCorrect: true, reason: "" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `In the $xy$-plane, line $t$ passes through the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$. Which equation defines line $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The slope of the line passing through points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ is $m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${slope * x2}}{${x2}} = ${slope}$. The y-intercept is ${y1} (the y-coordinate when x=0). Therefore, the equation is $y = ${slope}x + ${y1}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-99ea3715.ts
/**
 * Question ID: 99ea3715
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation: 27x + 33y = 297, shift: 5]
 * - Difficulty factors: [Finding y-intercept, understanding vertical shift]
 * - Distractor patterns: [B: shift up instead of down, C/D: calculation errors]
 * - Constraints: [Original y-intercept must be integer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
