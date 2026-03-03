import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 2c05d312
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient 57, constants a and b, product of roots]
 * - Difficulty factors: [Vieta's formulas, product of roots = c/a, algebraic manipulation]
 * - Distractor patterns: [1/57 = correct, 1/19 = wrong coefficient, 1 = forgot denominator, 57 = inverted]
 * - Constraints: [Quadratic in standard form, identify product formula]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_2c05d312 = {
  metadata: {
    // id: "2c05d312",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 57x² + (57b+a)x + ab = 0, product = kab, find k
    // Pattern: Ax² + (Ab+a)x + ab = 0, product = ab/A = kab, so k = 1/A
    
    const A = getRandomInt(30, 80); // The main coefficient (like 57)
    
    // Verify A is not divisible by small primes to make it look "random"
    // We can just use the value directly
    
    // The equation is: Ax² + (Ab+a)x + ab = 0
    // Product of roots = ab/A
    // Given as kab, so k = 1/A
    
    const kValue = 1 / A;
    
    // STEP 2: Create options
    const correctAnswer = `\\frac{1}{${A}}`;
    
    // Distractor B: 1/(A/3) = 3/A if divisible... or just wrong number
    const wrongDenom = Math.floor(A / 3); // Approximately
    const distractorB = wrongDenom > 0 ? `\\frac{1}{${wrongDenom}}` : `\\frac{1}{19}`;
    
    // Distractor C: 1
    const distractorC = "1";
    
    // Distractor D: A (inverted)
    const distractorD = A.toString();
    
    const optionsData = [
      { text: `$${correctAnswer}$`, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "uses an incorrect denominator" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "forgets to divide by the coefficient of $x^2$" },
      { text: `$${distractorD}$`, isCorrect: false, reason: "inverts the relationship, using the coefficient instead of its reciprocal" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. For a quadratic $Ax^2+Bx+C=0$, the product of solutions is $\\frac{C}{A}$. Here, $A=${A}$, $B=${A}b+a$, and $C=ab$. The product is $\\frac{ab}{${A}}=kab$, so $k=\\frac{1}{${A}}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$${A}x^2 + (${A}b + a)x + ab = 0$\n\nIn the given equation, $a$ and $b$ are positive constants. The product of the solutions to the given equation is $kab$, where $k$ is a constant. What is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 1fe32f7d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-x²+bx-676=0, no real solution, find max b]
 * - Difficulty factors: [Discriminant < 0 condition, negative leading coefficient, perfect square]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Discriminant must be negative, b must be positive integer, 676=26²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/1fe32f7d.ts