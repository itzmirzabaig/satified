import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1021
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic polynomial with GCF, factoring quadratic]
 * - Difficulty factors: [Factoring out GCF, factoring quadratic, finding factors of form x+b]
 * - Distractor patterns: [Not finding smallest b, missing GCF]
 * - Constraints: [b must be positive, find smallest possible b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1021 = {
  metadata: {
    id: "1021",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the polynomial
    // Pattern: 2x^3 + (2a+2b)x^2 + 2abx = 2x(x^2 + (a+b)x + ab) = 2x(x+a)(x+b)
    // Before: the two roots could both be 10 (a repeated factor), and the
    // explanation used markdown bullets and display math with no
    // "The correct answer is" opening. Now the two values always differ.
    let factor1 = 0, factor2 = 0;
    do {
      factor1 = getRandomInt(6, 10);
      factor2 = getRandomInt(10, 15);
    } while (factor1 === factor2);

    const a = Math.min(factor1, factor2);
    const b = Math.max(factor1, factor2);

    // Calculate coefficients
    const quadCoeff = 2 * (a + b);
    const linearCoeff = 2 * a * b;

    // STEP 2: Calculate answer
    const correctAnswer = a.toString();

    // STEP 3: Question text
    const questionText = `One of the factors of $2x^{3}+${quadCoeff}x^{2}+${linearCoeff}x$ is $x+b$, where $b$ is a positive constant. What is the smallest possible value of $b$?`;

    // STEP 4: Explanation (one paragraph, inline math)
    const explanation = `The correct answer is ${a}. Each term has the common factor $2x$, so $2x^{3}+${quadCoeff}x^{2}+${linearCoeff}x = 2x(x^{2}+${a + b}x+${a * b})$. The two numbers with a sum of ${a + b} and a product of ${a * b} are ${a} and ${b}, so $x^{2}+${a + b}x+${a * b} = (x+${a})(x+${b})$, and the complete factorization is $2x(x+${a})(x+${b})$. The factors of the form $x+b$ with $b$ positive are $x+${a}$ and $x+${b}$, so the possible values of $b$ are ${a} and ${b}. The smallest of these is ${a}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
