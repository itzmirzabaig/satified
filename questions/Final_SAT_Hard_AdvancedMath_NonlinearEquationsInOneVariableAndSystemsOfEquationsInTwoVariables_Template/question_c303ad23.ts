import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c303ad23
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3x²-18x-15=0, find x²-6x]
 * - Difficulty factors: [Divide by common factor, recognize pattern, no need to solve fully]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Divide by 3 to simplify, notice x²-6x appears directly]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_c303ad23 = {
  metadata: {
    // id: "c303ad23",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 3x²-18x-15=0 → divide by 3: x²-6x-5=0 → x²-6x=5
    // Pattern: ax² - 2abx - ac = 0, divide by a: x² - 2bx - c = 0, so x² - 2bx = c
    
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 8); // Will be the coefficient/2 in simplified form
    const c = getRandomInt(3, 12); // The answer
    
    // Equation: ax² - 2abx - ac = 0 → divide by a: x² - 2bx - c = 0 → x² - 2bx = c
    // But we want to ask for x² - 2bx (or similar), so that's the answer
    
    const coefficient = 2 * b; // The linear coefficient after dividing
    const constant = a * c; // The constant term before dividing
    
    // STEP 2: Calculate answer
    const answer = c;
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    return {
      questionText: `If $${a}x^2 - ${2*a*b}x - ${constant} = 0$, what is the value of $x^2 - ${coefficient}x$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: answer.toString(),
      explanation: `The correct answer is $${answer}$. Dividing each side of the given equation by $${a}$ yields $x^2-${coefficient}x-${c}=0$. Adding $${c}$ to each side yields $x^2-${coefficient}x=${c}$.`
    };
  }
};

/**
 * Question ID: 2cb17792
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system with k, one distinct solution, discriminant=0]
 * - Difficulty factors: [System of equations, substitution, discriminant condition]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Subtract equations, get quadratic in x, discriminant=0]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/2cb17792.ts