import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 25e1cfed
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 15, 9, 15, 6, 10 (small integers)]
 * - Difficulty factors: [Identifying infinitely many solutions by simplification]
 * - Distractor patterns: [A: exactly one (if coefficients differ), B: exactly two (quadratic confusion), D: zero (if same coeff but different constants)]
 * - Constraints: [Equation must simplify to identity]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_25e1cfed = {
  metadata: {
    // id: "25e1cfed",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation with infinitely many solutions
    // Structure: a(bx - c) = d(fx - e) where ab = df and ac = de
    
    let valid = false;
    let a: number, b: number, c_pos: number, d: number, f: number, e_pos: number;
    
    while (!valid) {
      a = getRandomInt(2, 12);
      b = getRandomInt(2, 8);
      d = getRandomInt(2, 8);
      
      // f must equal (a * b) / d for coefficients to match
      const fRaw = (a * b) / d;
      
      // Ensure f is integer
      if (Number.isInteger(fRaw) && fRaw > 0) {
        f = fRaw;
        e_pos = getRandomInt(2, 10);
        c_pos = (d * e_pos) / a;
        
        // Ensure c_pos is valid integer
        if (Number.isInteger(c_pos) && c_pos > 0) {
          valid = true;
        }
      }
    }
    
    const correctLeft = `${a}(${b}x - ${c_pos})`;
    const correctRight = `${d}(${f}x - ${e_pos})`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: "Exactly one", isCorrect: false, reason: "this would occur when the coefficients of $x$ are different, leading to a unique solution" },
      { text: "Exactly two", isCorrect: false, reason: "linear equations cannot have exactly two solutions; this would require a quadratic equation" },
      { text: "Zero", isCorrect: false, reason: "this would occur when the coefficients of $x$ are equal but the constant terms are different, leading to a contradiction like $0 = 5$" },
      { text: "Infinitely many", isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `To determine the number of solutions, simplify both sides of the equation.

1.  **Distribute the terms:**
    *   Left side: $${a}(${b}x - ${c_pos}) = ${a * b}x - ${a * c_pos}$
    *   Right side: $${d}(${f}x - ${e_pos}) = ${d * f}x - ${d * e_pos} = ${a * b}x - ${a * c_pos}$

2.  **Rewrite the simplified equation:**
    $${a * b}x - ${a * c_pos} = ${a * b}x - ${a * c_pos}$

3.  **Analyze the result:**
    Since both sides of the equation are identical, any value substituted for $x$ will make the equation true.

Therefore, the equation has **infinitely many solutions**.

Choice ${correctLetter} is correct.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.

Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.

Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `How many solutions does the equation $${correctLeft} = ${correctRight}$ have?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Infinitely many",
      explanation: explanation
    };
  }
};

/**
 * Question ID: e6cb2402
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3, 4, 13, 36 (small integers)]
 * - Difficulty factors: [No solution condition with parameter k]
 * - Distractor patterns: [N/A - fill-in-blank, but note: original answer 16/17 seems wrong]
 * - Constraints: [Must have no solution: a = c but b ≠ d in ax+b=cx+d form]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 * 
 * NOTE: The original explanation says "k = 16/17" but the math doesn't work.
 * 3(kx + 13) = 4x + 36
 * 3kx + 39 = 4x + 36
 * For no solution: 3k = 4 so k = 4/3, and 39 ≠ 36 ✓
 * So k should be 4/3, not 16/17.
 * Let me verify: 16/17 ≈ 0.94, and 3*(16/17) = 48/17 ≈ 2.82 ≠ 4
 * This appears to be an error in the original. Correct answer should be 4/3.
 * However, I'll preserve the difficulty and generate similar questions correctly.
 */

// File: generators/linear-equations-in-one-variable/e6cb2402.ts