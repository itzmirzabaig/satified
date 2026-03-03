import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9474771
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=x+9 and y=x²+16x+63, greatest x-value]
 * - Difficulty factors: [System with line and parabola, substitution, factor quadratic]
 * - Distractor patterns: [A: -6/correct, B: 7, C: 9, D: 63]
 * - Constraints: [Find both solutions, identify greatest x]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_9474771 = {
  metadata: {
    // id: "9474771",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: y = x + c1, y = x² + bx + c2, find greatest x
    
    // Substitution: x + c1 = x² + bx + c2 → x² + (b-1)x + (c2-c1) = 0
    
    // Let's create factorable quadratic with negative roots
    // (x + p)(x + q) = x² + (p+q)x + pq where p, q > 0
    
    const p = getRandomInt(4, 9);
    const q = p + getRandomInt(1, 4); // q > p, so -p > -q (greatest is -p)
    
    const b = p + q + 1; // So that b-1 = p+q
    const cDiff = p * q; // c2 - c1 = pq
    
    // c1 and c2: c2 = c1 + pq, let's pick c1
    const c1 = getRandomInt(5, 12);
    const c2 = c1 + cDiff;
    
    // Solutions: x = -p and x = -q, greatest is -p
    
    const greatestX = -p;
    const distractorB = q; // Positive version
    const distractorC = c1; // The constant
    const distractorD = c2; // The larger constant
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$${greatestX}$`, isCorrect: true },
      { text: `$${distractorB}$`, isCorrect: false, reason: "is the positive version of one solution, not the greatest x-value" },
      { text: `$${distractorC}$`, isCorrect: false, reason: "is the y-intercept of the line, not a solution" },
      { text: `$${distractorD}$`, isCorrect: false, reason: "is the constant term in the parabola, not a solution" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Setting the expressions equal: $x+${c1}=x^2+${b}x+${c2}$, so $x^2+${b-1}x+${cDiff}=0$. This factors as $(x+${p})(x+${q})=0$. The solutions are $x=-${p}$ and $x=-${q}$. The greatest value is $${greatestX}$.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$y = x + ${c1}$\n$y = x^2 + ${b}x + ${c2}$\n\nA solution to the given system of equations is $(x,y)$. What is the greatest possible value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 133f3e41
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation with reciprocals, 20/p = 20/q - 20/r - 20/s]
 * - Difficulty factors: [Divide by common factor, combine fractions, solve for q]
 * - Distractor patterns: [A: p+r+s, B: 20(p+r+s), C: prs/(pr+ps+rs)/correct, D: wrong with 20s]
 * - Constraints: [Harmonic mean type formula, combine reciprocals]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/133f3e41.ts