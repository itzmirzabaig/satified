import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 42f8e4b4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic polynomial with GCF, factoring quadratic]
 * - Difficulty factors: [Factoring out GCF, factoring quadratic, finding factors of form x+b]
 * - Distractor patterns: [Not finding smallest b, missing GCF]
 * - Constraints: [b must be positive, find smallest possible b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_42f8e4b4 = {
  metadata: {
    // id: "42f8e4b4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the polynomial
    // Pattern: 2x³ + (2a+2b)x² + 2abx = 2x(x² + (a+b)x + ab) = 2x(x+a)(x+b)
    
    // Choose two factors
    const factor1 = getRandomInt(6, 10);
    const factor2 = getRandomInt(10, 15);
    
    const a = Math.min(factor1, factor2);
    const b = Math.max(factor1, factor2);
    
    // Calculate coefficients
    const quadCoeff = 2 * (a + b);
    const linearCoeff = 2 * a * b;
    
    // STEP 2: Calculate answer
    const correctAnswer = a.toString();
    
    // STEP 3: Question text
    const questionText = `One of the factors of $2x^{3}+${quadCoeff}x^{2}+${linearCoeff}x$ is $x+b$, where $b$ is a positive constant. What is the smallest possible value of $b$?`;
    
    // STEP 4: Explanation
    const explanation = `Factor out the greatest common factor $2x$:
$$2x^{3}+${quadCoeff}x^{2}+${linearCoeff}x = 2x(x^{2}+${a+b}x+${a*b})$$

Factor the quadratic $x^{2}+${a+b}x+${a*b}$ by finding two numbers with sum ${a+b} and product ${a*b}:
- The numbers are ${a} and ${b}

So: $x^{2}+${a+b}x+${a*b} = (x+${a})(x+${b})$

The complete factorization is:
$$2x(x+${a})(x+${b})$$

The factors of the form $x+b$ where $b$ is positive are $(x+${a})$ and $(x+${b})$.
The corresponding values of $b$ are ${a} and ${b}.
Therefore, the smallest possible value of $b$ is ${a}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 12e7faf8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic divided by linear, simplifying to linear]
 * - Difficulty factors: [Factoring numerator, canceling common factors, finding a+d]
 * - Distractor patterns: [Wrong factorization, not canceling, calculation errors in a+d]
 * - Constraints: [x ≠ -7, a and d are integers]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */