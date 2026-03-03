import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 2cd6b22d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5x²+10x+16=0, discriminant=100-320=-220]
 * - Difficulty factors: [Calculate discriminant, identify sign]
 * - Distractor patterns: [A: one, B: two, C: infinite, D: zero/correct]
 * - Constraints: [Discriminant negative means no real solutions]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_2cd6b22d = {
  metadata: {
    // id: "2cd6b22d",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: ax² + bx + c = 0 where b² < 4ac (negative discriminant)
    
    const a = getRandomInt(2, 6);
    const b = getRandomInt(5, 15);
    const c = getRandomInt(10, 30); // Large enough to make discriminant negative
    
    // Verify discriminant is negative
    const discriminant = b * b - 4 * a * c;
    
    // If not negative, adjust c
    let finalC = c;
    let finalDisc = discriminant;
    while (finalDisc >= 0) {
      finalC++;
      finalDisc = b * b - 4 * a * finalC;
    }
    
    // STEP 2: Create options (D is correct - zero)
    const optionsData = [
      { text: `Exactly one`, isCorrect: false, reason: "is incorrect; this would require the discriminant to equal 0" },
      { text: `Exactly two`, isCorrect: false, reason: "is incorrect; this would require a positive discriminant" },
      { text: `Infinitely many`, isCorrect: false, reason: "is incorrect; a quadratic equation cannot have infinitely many solutions" },
      { text: `Zero`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Calculating the discriminant: $\\Delta = (${b})^2 - 4(${a})(${finalC}) = ${b*b} - ${4*a*finalC} = ${finalDisc}$. Since $\\Delta < 0$, the equation has zero distinct real solutions.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${a}x^2 + ${b}x + ${finalC} = 0$\n\nHow many distinct real solutions does the given equation have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e9349667
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=x²+2x+1 and y=-x-1, find y₁+y₂]
 * - Difficulty factors: [System with parabola and line, substitution, sum of y-values]
 * - Distractor patterns: [A: -3, B: -2, C: -1, D: 1/correct]
 * - Constraints: [Find both solutions, calculate y-values, sum them]
 * - Question type: [Multiple choice text with figure]
 * - Figure generation: [Mafs graph showing intersections]
 */

// File: generators/hard/advanced_math/e9349667.ts