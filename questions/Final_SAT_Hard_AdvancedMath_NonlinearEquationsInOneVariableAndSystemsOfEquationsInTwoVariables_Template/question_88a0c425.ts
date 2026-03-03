import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 88a0c425
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-2x²+20x+c=0, exactly one solution, find c]
 * - Difficulty factors: [Negative leading coefficient, discriminant = 0]
 * - Distractor patterns: [A:-68=miscalculated, B:-50=correct, C:-32=miscalculated, D:0=wrong]
 * - Constraints: [Quadratic with negative leading coefficient, discriminant=0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_88a0c425 = {
  metadata: {
    // id: "88a0c425",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: -ax² + bx + c = 0, discriminant = b² + 4ac = 0 (note: a is negative in formula)
    // Actually: a = -2, b = 20, so D = 400 - 4(-2)c = 400 + 8c = 0 → c = -50
    
    const a = -1 * getRandomInt(2, 5); // Negative leading coefficient
    const b = getRandomInt(15, 25) * 2; // Even for clean division
    
    // Discriminant: b² - 4ac = 0 → b² = 4ac → c = b²/(4a)
    // Since a is negative, c will be negative
    
    const cValue = (b * b) / (4 * a);
    
    // Distractors
    const distractorA = cValue - getRandomInt(10, 20);
    const distractorC = cValue + getRandomInt(10, 20);
    const distractorD = 0;
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: "results from a sign error in the discriminant calculation" },
      { text: `$${cValue}$`, isCorrect: true },
      { text: `$${distractorC}$`, isCorrect: false, reason: "results from an arithmetic error" },
      { text: `$${distractorD}$`, isCorrect: false, reason: "would make the equation $${a}x^2+${b}x=0$, which has two solutions" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. For exactly one solution, the discriminant equals 0: $(${b})^2-4(${a})c=0$, so $${b*b}+${-4*a}c=0$, thus $c=${cValue}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${a}x^2 + ${b}x + c = 0$\n\nIn the given equation, $c$ is a constant. The equation has exactly one solution. What is the value of $c$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 17d0e87d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [literal equation with square root, solve for w]
 * - Difficulty factors: [Multiple algebraic steps, isolate variable, simplify fraction]
 * - Distractor patterns: [A:sqrt(x/y)-19, B:wrong fraction simplification, C:squared instead of sqrt, D:double wrong]
 * - Constraints: [Two variables in equation, must isolate w through multiple steps]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/17d0e87d.ts