import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9f3cb472
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1/3, point: (9, 10)]
 * - Difficulty factors: [Point-slope form, solving for y-intercept]
 * - Distractor patterns: [A: wrong slope, B: using point as coefficients, C: wrong intercept, D: correct]
 * - Constraints: [Clean arithmetic for intercept]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_9f3cb472 = {
  metadata: {
    // id: "9f3cb472",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slopeNum = getRandomInt(1, 5);
    const slopeDen = getRandomInt(2, 6);
    const slopeSign = getRandomElement([-1, 1]);
    const x1 = getRandomInt(3, 15);
    const y1 = getRandomInt(5, 20);
    
    // Calculate y-intercept: b = y - mx
    const b = y1 - (slopeSign * slopeNum * x1) / slopeDen;
    // Ensure b is clean
    const bClean = Math.round(b * slopeDen) / slopeDen;
    
    // STEP 2: Create options
    const slopeStr = slopeSign === -1 ? `-\\frac{${slopeNum}}{${slopeDen}}` : `\\frac{${slopeNum}}{${slopeDen}}`;
    
    const optionsData = [
      { text: `\\( y = ${y1 + x1}x ${slopeSign === -1 ? '-' : '+'} \\frac{${slopeNum}}{${slopeDen}} \\)`, isCorrect: false, reason: "swapped slope and intercept values" },
      { text: `\\( y = ${x1}x + ${y1} \\)`, isCorrect: false, reason: "used the coordinates as slope and intercept" },
      { text: `\\( y = ${slopeStr}x + ${y1} \\)`, isCorrect: false, reason: "used the y-coordinate as the y-intercept without solving" },
      { text: `\\( y = ${slopeStr}x + ${bClean} \\)`, isCorrect: true, reason: "" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `Line \\( t \\) in the \\( xy \\)-plane has a slope of \\(${slopeSign === -1 ? '-' : ''}\\frac{${slopeNum}}{${slopeDen}}\\) and passes through the point \\((${x1}, ${y1})\\). Which equation defines line \\( t \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. The equation that defines line \\( t \\) in the xy-plane can be written in slope-intercept form \\( y=mx+b \\), where \\( m \\) is the slope of line \\( t \\) and \\((0, b)\\) is its y-intercept. It's given that line \\( t \\) has a slope of \\(${slopeSign === -1 ? '-' : ''}\\frac{${slopeNum}}{${slopeDen}}\\). Therefore, \\( m=${slopeSign === -1 ? '-' : ''}\\frac{${slopeNum}}{${slopeDen}} \\). It's also given that line \\( t \\) passes through the point \\((${x1},${y1})\\). Substituting ${x1} for \\( x \\) and ${y1} for \\( y \\) in the equation and solving for b yields the y-intercept of ${bClean}.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-d7c8ba0b.ts
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
