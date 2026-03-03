import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9551cd91
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cars: 3,5,10, passengers: 174,284,559, slope ~55, intercept ~9]
 * - Difficulty factors: [Finding linear equation from table, rearranging to standard form]
 * - Distractor patterns: [B = sign error, C = swapped variables, D = swapped variables and sign error]
 * - Constraints: [Table data must be consistent with linear model]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_9551cd91 = {
  metadata: {
    // id: "9551cd91",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 45-65
    const m = getRandomInt(45, 65);
    // Intercept: 5-15
    const b = getRandomInt(5, 15);
    // Car values
    const c1 = 3;
    const c2 = 5;
    const c3 = 10;
    // Calculate passengers
    const p1 = m * c1 + b;
    const p2 = m * c2 + b;
    const p3 = m * c3 + b;
    
    // STEP 2: Build table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">Number of cars</th><th style="border: 1px solid currentColor; padding: 8px;">Maximum number of passengers and crew</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${c1}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${p1}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${c2}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${p2}</td></tr><tr><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${c3}</td><td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${p3}</td></tr></tbody></table>`;
    
    // STEP 3: Create options (standard form: mc - p = -b or mc - p = b depending on rearrangement)
    // p = mc + b → mc - p = -b
    const correctEq = `${m}c - p = ${-b}`;
    const distB = `${m}c - p = ${b}`; // Sign error
    const distC = `${m}p - c = ${-b}`; // Swapped
    const distD = `${m}p - c = ${b}`; // Swapped and sign error
    
    const optionsData = [
      { text: correctEq, isCorrect: true },
      { text: distB, isCorrect: false, reason: "has incorrect sign on the constant term" },
      { text: distC, isCorrect: false, reason: "incorrectly swaps the variables c and p" },
      { text: distD, isCorrect: false, reason: "swaps variables and has incorrect sign" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The table shows the linear relationship between the number of cars, $c$, on a commuter train and the maximum number of passengers and crew, $p$, that the train can carry. Which equation represents the linear relationship between $c$ and $p$? ${tableCode}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $\\frac{${p2} - ${p1}}{${c2} - ${c1}} = \\frac{${p2 - p1}}{${c2 - c1}} = ${m}$. Using point (${c3}, ${p3}): ${p3} = ${m}(${c3}) + b, so b = ${p3 - m * c3} = ${b}$. The equation is $p = ${m}c + ${b}$, which rearranges to ${m}c - p = ${-b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: ebd457f4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [earnings: 215, fraction: 2/5, weeks: 9]
 * - Difficulty factors: [Fraction multiplication, multi-step calculation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - straightforward calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */