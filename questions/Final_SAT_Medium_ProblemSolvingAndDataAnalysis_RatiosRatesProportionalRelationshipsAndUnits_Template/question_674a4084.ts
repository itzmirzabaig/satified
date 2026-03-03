import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 674a4084
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 3/20 ft/s, 3 feet = 1 yard]
 * - Difficulty factors: [Fraction division, unit conversion with fractions]
 * - Distractor patterns: [B: 9/20 (multiply by 3), C: 6, D: 20]
 * - Constraints: [Must divide by 3]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_674a4084 = {
  metadata: {
    // id: "674a4084",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 3/20 ft/s, 3ft=1yd, answer = 1/20
    const numerator = getRandomInt(1, 9);
    const denominator = getRandomInt(10, 30);
    const feetPerYard = getRandomInt(2, 5);
    
    // STEP 2: Calculate conversion (divide by feetPerYard)
    // Result: numerator/(denominator * feetPerYard)
    const resultNum = numerator;
    const resultDen = denominator * feetPerYard;
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(resultNum, resultDen);
    
    const simplified = resultDen / divisor === 1 
      ? (resultNum / divisor).toString()
      : `\\frac{${resultNum / divisor}}{${resultDen / divisor}}`;
    
    // STEP 3: Create distractors
    // B: multiply instead of divide
    const wrongNum = numerator * feetPerYard;
    const wrongGcd = gcd(wrongNum, denominator);
    const wrongB = `\\frac{${wrongNum / wrongGcd}}{${denominator / wrongGcd}}`;
    
    const optionsData = [
      { text: simplified, isCorrect: true },
      { text: wrongB, isCorrect: false, reason: "comes from multiplying by $${feetPerYard}$ instead of dividing by $${feetPerYard}$" },
      { text: getRandomInt(2, 10).toString(), isCorrect: false, reason: "results from confusion with the numbers ${numerator} and ${denominator}" },
      { text: denominator.toString(), isCorrect: false, reason: "is the denominator of the original fraction and is unrelated to the converted value" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `An insect moves at a speed of $\\frac{${numerator}}{${denominator}}$ feet per second. What is this speed, in yards per second? ($${feetPerYard}$ feet = 1 yard)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: simplified,
      explanation: `Choice ${correctLetter} is correct. To convert feet per second to yards per second, divide by $${feetPerYard}$: $\\left( \\frac{${numerator}}{${denominator}} \\frac{\\text{feet}}{\\text{sec}} \\right) \\times \\left( \\frac{1 \\text{ yard}}{${feetPerYard} \\text{ feet}} \\right) = \\frac{${numerator}}{${denominator}} \\times \\frac{1}{${feetPerYard}} = \\frac{${numerator}}{${denominator * feetPerYard}} = ${simplified}$ yards per second. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 51c9d65f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio 35:10, width increase by 7]
 * - Difficulty factors: [Proportional change, multiplication vs addition]
 * - Distractor patterns: [A: decrease by 24.5, C: decrease by 7, D: increase by 7]
 * - Constraints: [Must multiply ratio by change, not add]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/51c9d65f.ts