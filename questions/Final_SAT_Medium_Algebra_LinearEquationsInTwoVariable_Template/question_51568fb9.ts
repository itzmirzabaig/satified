import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 51568fb9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 10, -5, constant: -12]
 * - Difficulty factors: [Converting standard form to slope-intercept]
 * - Distractor patterns: [A: sign error, B/C: unrelated fractions, D: correct]
 * - Constraints: [Clean integer slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_51568fb9 = {
  metadata: {
    // id: "51568fb9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters for clean slope
    // 10x - 5y = -12 → y = 2x + 12/5, slope = 2
    const A = getRandomInt(5, 15);
    const slope = getRandomInt(2, 6);
    const bVal = getRandomInt(2, 6);
    const aVal = slope * bVal;
    const C = getRandomInt(-20, 20);
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$-${slope}$`, isCorrect: false, reason: "sign error" },
      { text: `$-\\frac{${getRandomInt(3, 8)}}{${getRandomInt(5, 10)}}$`, isCorrect: false, reason: "unrelated fraction" },
      { text: `$\\frac{${getRandomInt(3, 8)}}{${getRandomInt(5, 10)}}$`, isCorrect: false, reason: "unrelated fraction" },
      { text: `$${slope}$`, isCorrect: true, reason: "" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `What is the slope of the graph of $${aVal}x - ${bVal}y = ${C}$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `The given equation is in the standard form $Ax + By = C$, where $A = ${aVal}$, $B = -${bVal}$, and $C = ${C}$. The slope of a line in this form is given by the formula $m = -\\frac{A}{B}$. Substituting the values: $m = -\\frac{${aVal}}{-${bVal}} = ${slope}$. Alternatively, converting to slope-intercept form: $-${bVal}y = -${aVal}x + ${C}$, so $y = ${slope}x - \\frac{${C}}{${bVal}}$. The slope is ${slope}.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-9c7741c6.ts
/**
 * Question ID: 9c7741c6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 210 miles, speed1: 60 mph, speed2: 50 mph, x: 1]
 * - Difficulty factors: [Setting up distance equation, substitution]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [y must be positive integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
