import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 30281058
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [parabola y=x²-9, line through (1,a) and (5,b), find slope]
 * - Difficulty factors: [Find points on parabola, calculate slope]
 * - Distractor patterns: [A: 6/correct, B: 2, C: -2, D: -6]
 * - Constraints: [Calculate y-values, use slope formula]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_30281058 = {
  metadata: {
    // id: "30281058",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: y = x² + c, points at (p, y1) and (q, y2), find slope
    
    const c = getRandomInt(-15, -5); // Negative constant (like -9)
    const p = getRandomInt(1, 4);
    const q = p + getRandomInt(3, 6); // q > p
    
    // y1 = p² + c, y2 = q² + c
    const y1 = p * p + c;
    const y2 = q * q + c;
    
    // Slope = (y2 - y1)/(q - p) = (q² - p²)/(q - p) = q + p
    const slope = q + p;
    
    // STEP 2: Create options
    const distractorB = Math.floor(slope / 3); // Approximately 2 when slope is 6
    const distractorC = -distractorB; // -2
    const distractorD = -slope; // -6
    
    const optionsData = [
      { text: `$${slope}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false, reason: "results from incorrectly dividing the difference in y-values" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "results from a sign error or swapping the order of subtraction" },
      { text: `$${distractorD}$`, isCorrect: false, reason: "results from subtracting in the wrong order for both numerator and denominator" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. At $x=${p}$, $y=(${p})^2+${c}=${y1}$. At $x=${q}$, $y=(${q})^2+${c}=${y2}$. The slope is $\\frac{${y2}-${y1}}{${q}-${p}}=\\frac{${y2-y1}}{${q-p}}=${slope}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `In the $xy$-plane, the graph of $y = x^2 ${c}$ intersects line $p$ at $(${p}, a)$ and $(${q}, b)$, where $a$ and $b$ are constants. What is the slope of line $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 9474771
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=x+9 and y=x²+16x+63, greatest x-value]
 * - Difficulty factors: [System with line and parabola, substitution, factor quadratic]
 * - Distractor patterns: [A: -6/correct, B: 7, C: 9, D: 63]
 * - Constraints: [Find both solutions, identify greatest x]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/9474771.ts