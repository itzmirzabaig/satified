import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bf749912
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 1/3, 1/2, result: -8, solution: 42]
 * - Difficulty factors: [Working with fractions, factoring common binomial]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Equation has common factor (x+6) that can be factored out]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_bf749912 = {
  metadata: {
    // id: "bf749912",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation with common factor pattern
    // Form: (1/a)(x+c) - (1/b)(x+c) = result
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 5);
    while (b === a) { /* ensure different */ }
    
    // Calculate (1/a - 1/b) = (b-a)/(ab)
    const common = a * b;
    const diff = b - a;
    
    // Result should make x a nice integer
    // (b-a)/(ab) * (x+c) = result
    // x+c = result * ab / (b-a)
    const targetX = getRandomInt(30, 60);
    const c = getRandomInt(3, 10);
    const result = (diff * (targetX + c)) / common;
    
    const correctAnswer = targetX.toString();
    
    return {
      questionText: `$$\\frac{1}{${a}}(x+${c})-\\frac{1}{${b}}(x+${c})=${result}$$ What value of $x$ is the solution to the given equation?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Notice that the expression $x+${c}$ appears in both terms on the left-hand side of the equation. Factor out $(x+${c})$ from the left-hand side: $$(x+${c})\\left(\\frac{1}{${a}}-\\frac{1}{${b}}\\right)=${result}$$ Finding a common denominator of ${common}: $$\\frac{1}{${a}}-\\frac{1}{${b}}=\\frac{${b}}{${common}}-\\frac{${a}}{${common}}=\\frac{${diff}}{${common}}$$ Substituting back: $$(x+${c})\\left(\\frac{${diff}}{${common}}\\right)=${result}$$ Multiplying both sides by $\\frac{${common}}{${diff}}$: $$x+${c}=${result} \\cdot \\frac{${common}}{${diff}}=${targetX + c}$$ Therefore, $x=${targetX}$.`
    };
  }
};

/**
 * Question ID: 79cf8505
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 115, part1: 47, equal parts: 34 each]
 * - Difficulty factors: [Word problem, setting up linear equation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [(Total - Part1) / 2 = Answer]
 * - Question type: [Fill-in-the-blank]
 */